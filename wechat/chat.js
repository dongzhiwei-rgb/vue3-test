import { WechatyBuilder } from 'wechaty'
import qrcodeTerminal from 'qrcode-terminal'
import axios from 'axios'

// ============ 填写自己信息 ============
const API_KEY = "ark-00f47107-0e4d-4789-b4d6-7cf57118c201-4ae0a"
const EP_ID = "ep-20260513163812-zptl8" // 北京地域推理接入点
const API_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions"
const MAX_HISTORY = 2000 // 最大记忆轮数，越大上下文越长
// ======================================

// 存储每个好友独立聊天记忆 key:好友id  value:对话数组
const chatMemory = new Map()

// 初始化人设 + 清空记忆指令
const SYSTEM_PROMPT = `你是智能聊天助手，语气自然灵动，适度开玩笑不要尬聊，记住用户前面所有对话内容，连贯回答问题，不要遗忘上下文。`

// 带上下文记忆调用豆包
async function chatWithMemory(contactId, userText) {
    // 没有记录就初始化
    if (!chatMemory.has(contactId)) {
        chatMemory.set(contactId, [{ role: "system", content: SYSTEM_PROMPT }])
    }
    const history = chatMemory.get(contactId)
    // 加入用户新消息
    history.push({ role: "user", content: userText })

    // 限制记忆长度，防止超限
    if (history.length > MAX_HISTORY + 1) {
        history.splice(1, 2)
    }

    try {
        const res = await axios.post(API_URL, {
            model: EP_ID,
            endpoint_id: EP_ID,
            messages: history,
            temperature: 0.7,
            stream: false
        }, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            timeout: 20000
        })
        const reply = res.data.choices[0].message.content
        // 存入AI回复进记忆
        history.push({ role: "assistant", content: reply })
        return reply
    } catch (err) {
        console.error("接口错误：", err.response?.data || err.message)
        return "给我CPU干烧了，等一下"
    }
}

// 清除单人记忆指令
function clearMemory(contactId) {
    chatMemory.delete(contactId)
}

// 微信机器人 UOS防风控
const bot = WechatyBuilder.build({
    puppetOptions: {
        uos: true,
        noWeb: true
    }
})

// 登录二维码
bot.on("scan", url => {
    console.log("\n===== 微信扫码登录 =====")
    qrcodeTerminal.generate(url, { small: true })
})

// 登录成功
bot.on("login", user => {
    console.log(`\n✅ 登录成功：${user.name()}`)
    console.log("✅ 带记忆豆包AI已启动，支持连续对话")
})

// 消息监听
bot.on("message", async msg => {
    if (msg.self() || msg.type() !== bot.Message.Type.Text) return
    const text = msg.text().trim()
    const contact = msg.talker()
    const cid = contact.id

    // 输入 清空记忆 即可重置对话
    if (text === "清空记忆") {
        clearMemory(cid)
        await msg.say("彳亍")
        return
    }

    console.log(`[${contact.name()}]：${text}`)
    const res = await chatWithMemory(cid, text)
    await msg.say(res)
})

bot.start().catch(e => console.log("启动失败：", e))