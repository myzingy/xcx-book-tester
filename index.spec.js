const automator = require('miniprogram-automator')

describe('index', () => {
  let miniProgram
  let page

  beforeAll(async () => {
    miniProgram = await automator.launch({
      cliPath: 'D:/Program Files (x86)/Tencent/微信web开发者工具/cli.bat',
      projectPath: 'D:/wechat-lite/xcx-book'
    })
    page = await miniProgram.reLaunch('/pages/customer/index')
    await page.waitFor(2000)

    it('desc', async () => {
      const desc = await page.$('.index-desc')
      expect(desc.tagName).toBe('view')
      expect(await desc.text()).toContain('以下将展示小程序官方组件能力')
    })

  }, 30000)



  afterAll(async () => {
    await miniProgram.close()
  })
})