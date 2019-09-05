/**
 * D:\Program Files (x86)\Tencent\微信web开发者工具>
 *  cli --auto D:/wechat-lite/xcx-book --auto-port 9420
 */
const automator = require('miniprogram-automator')
let  miniProgram,page
automator.connect({
  wsEndpoint: 'ws://127.0.0.1:9420'
}).then(async program => {
  miniProgram=program
  //await miniProgram.remote() // 扫码登录连接真机，在真机上执行后续测试脚本
  main()
})
async function main(){
  page = await miniProgram.switchTab('/pages/reserve/index')
  //const pageStack = await miniProgram.pageStack()
  //await page.waitFor(2000)
  let ses = await page.$$('sb-tr')
  let resbut=await ses[0].$('.phone')
  await resbut.tap()

  await page.waitFor(1000)
  page=await miniProgram.currentPage()
  let subbut=await page.$('.reserve-button')
  await subbut.tap()

  await weekCalendarDaySelectDur()
  await gotoSubmitPage()

  ////submitPage
  gotoReservePage().then(async ()=>{
    await weekCalendarDaySelectDur()
    await gotoSubmitPage()

    await setLinker()
    let subbut=await page.$('.share-but')
    await subbut.tap()
  })

}
async function weekCalendarDaySelectDur() {
  await page.waitFor(1000)
  page=await miniProgram.currentPage()
  let calendar=await page.$('calendar')
  let weekCalendarDay=await calendar.$$('.week-calendar-day')
  console.log('weekCalendarDay.length',weekCalendarDay.length)
  weekCalendarDay[weekCalendarDay.length-parseInt(Math.random()*5+1)].tap();
  await selectDur()
}
async function gotoSubmitPage() {
  await page.waitFor(1000)
  page=await miniProgram.currentPage()
  console.log('gotoSubmitPage.page',page.path)
  let subbut=await page.$('.reserve-button')
  await subbut.tap()

}
async function gotoReservePage(){
  await page.waitFor(1000)
  page=await miniProgram.currentPage()
  let back=await page.$('.opt-button');
  await back.tap()
}
async function selectRoom(){
  await page.waitFor(500)
  let room=await page.$('room')
  let roomItem=await room.$$('.room-item')
  console.log('roomItem.length',roomItem.length)
  let mxi=parseInt(Math.random()*roomItem.length)+1
  for(let i=0;i<mxi;i++){
    let rn=parseInt(Math.random()*roomItem.length)
    //console.log('rn',rn)
    roomItem[rn].tap();
    await page.waitFor(500)
  }
}
async function selectDur(){
  await page.waitFor(500)
  let section=await page.$('section')
  let sectionSingle=await section.$$('.section-single')
  console.log('sectionSingle.length',sectionSingle.length)
  let mxi=parseInt(Math.random()*sectionSingle.length)+1
  for(let i=0;i<mxi;i++){
    let rn=parseInt(Math.random()*sectionSingle.length)
    //console.log('rn',rn)
    sectionSingle[rn].tap();
    await selectRoom(page)
  }
}
async function setLinker() {
  await page.waitFor(500)
  page=await miniProgram.currentPage()
  await page.callMethod('changeInput',{
    currentTarget:{
      dataset:{
        key:'name'
      }
    },
    detail:{
      value:'T-name'
    },
  })
  await page.callMethod('changeInput',{
    currentTarget:{
      dataset:{
        key:'phone'
      }
    },
    detail:{
      value:'17011110000'
    },
  })
  await page.callMethod('changeInput',{
    currentTarget:{
      dataset:{
        key:'remark'
      }
    },
    detail:{
      value:'T-name-remark'
    },
  })
}