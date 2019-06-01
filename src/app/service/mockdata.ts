export const MOCK_DATA = {
    GetPosData: [
        { pos: [117.029351, 36.684608], posid: '1', poscode: '0001', posname: '大明湖', amqty: 10090000, orival: 1000 },
        { pos: [117.134201, 36.667733], posid: '2', poscode: '0002', posname: '浪潮科技园', amqty: 100, orival: 1000 },
        { pos: [117.083105, 36.252451], posid: '3', poscode: '0003', posname: '泰山', amqty: 100, orival: 1000 },
        { pos: [117.042573, 36.644716], posid: '4', poscode: '0004', posname: '千佛山', amqty: 100, orival: 1000 },
        { pos: [116.998412, 36.731768], posid: '5', poscode: '0005', posname: '黄河森林公园', amqty: 100, orival: 1000 },
        { pos: [117.363142, 39.134684], posid: '6', poscode: '0006', posname: '天津滨海机场', amqty: 100, orival: 1000 },
        { pos: [117.179313, 39.114672], posid: '7', poscode: '0007', posname: '天津大学', amqty: 100, orival: 1000 },
    ],
    GetCardList: {
        '1': [
            { amcode: 'ZC001', amname: '轿车', compname: '浪潮集团', pos: [117.179313, 39.114672] },
            { amcode: 'ZC001', amname: '卡车', compname: '浪潮集团', pos: [117.042573, 36.644716] },
            { amcode: 'ZC001', amname: '挖掘机', compname: '浪潮集团', pos: [117.042573, 36.644716] }
        ],
        '2': [
            { amcode: 'ZC1001', amname: '大厦', compname: '浪潮集团', pos: [117.179313, 39.114672] },
            { amcode: 'ZC1001', amname: '宿舍', compname: '浪潮集团', pos: [117.042573, 36.644716] },
            { amcode: 'ZC1001', amname: '教学楼', compname: '浪潮集团', pos: [117.179313, 39.114672] },
            { amcode: 'ZC1001', amname: '公务车1', compname: '浪潮集团', pos: [117.179313, 39.114672] },
            { amcode: 'ZC1001', amname: '公务车2', compname: '浪潮集团', pos: [117.179313, 39.114672] },
            { amcode: 'ZC1001', amname: '公务车3', compname: '浪潮集团', pos: [117.179313, 39.114672] },
            { amcode: 'ZC1001', amname: '公务车4', compname: '浪潮集团', pos: [117.179313, 39.114672] },
            { amcode: 'ZC1001', amname: '公务车5', compname: '浪潮集团', pos: [117.179313, 39.114672] },
            { amcode: 'ZC1001', amname: '公务车6', compname: '浪潮集团', pos: [117.179313, 39.114672] },
            { amcode: 'ZC1001', amname: '公务车7', compname: '浪潮集团', pos: [117.179313, 39.114672] },
        ],
        '3': [
            { amcode: 'ZC33001', amname: '农田', compname: '浪潮集团', pos: [117.042573, 36.644716] },
            { amcode: 'ZC33001', amname: '挖井机', compname: '浪潮集团', pos: [117.042573, 36.644716] },
            { amcode: 'ZC33001', amname: '钻井', compname: '浪潮集团', pos: [117.042573, 36.644716] }
        ],
    },
    GetCardByName: {
        '轿车': [
            { amcode: 'ZC010001', amname: '奥迪轿车1', posid: '2', pos: [117.179313, 39.114672], compname: '浪潮集团' },
            { amcode: 'ZC010002', amname: '奥迪轿车2', posid: '2', pos: [117.363142, 39.134684], compname: '浪潮集团' },
            { amcode: 'ZC010003', amname: '奥迪轿车3', posid: '2', pos: [117.042573, 36.644716], compname: '浪潮集团' },
            { amcode: 'ZC010004', amname: '奥迪轿车4', posid: '2', pos: [117.029351, 36.684608], compname: '浪潮集团' },
            { amcode: 'ZC010005', amname: '奥迪轿车5', posid: '2', pos: [117.042573, 36.644716], compname: '浪潮集团' },
            { amcode: 'ZC010006', amname: '奥迪轿车6', posid: '2', pos: [117.179313, 39.114672], compname: '浪潮集团' },
            { amcode: 'ZC010007', amname: '奥迪轿车7', posid: '2', pos: [117.179313, 39.114672], compname: '浪潮集团' },
            { amcode: 'ZC010008', amname: '奥迪轿车8', posid: '2', pos: [117.179313, 39.114672], compname: '浪潮集团' },
            { amcode: 'ZC010009', amname: '奥迪轿车9', posid: '2', pos: [117.179313, 39.114672], compname: '浪潮集团' },
            { amcode: 'ZC010010', amname: '奥迪轿车10', posid: '2', pos: [117.179313, 39.114672], compname: '浪潮集团' }
        ],
        '卡车': [
            { amcode: 'ZC010001', amname: '奥迪轿车1', posid: '2', pos: [117.179313, 39.114672], compname: '浪潮集团' }
        ]
    },
    GetCardByUseComp: {
        '11': [
            { amcode: 'ZC010001', amname: '奥迪轿车1', posid: '2', pos: [117.179313, 39.114672], compname: '浪潮集团' },
            { amcode: 'ZC010002', amname: '奥迪轿车2', posid: '2', pos: [117.363142, 39.134684], compname: '浪潮集团' },
            { amcode: 'ZC010003', amname: '奥迪轿车3', posid: '2', pos: [116.998412, 36.731768], compname: '浪潮集团' },
            { amcode: 'ZC010004', amname: '奥迪轿车4', posid: '2', pos: [117.029351, 36.684608], compname: '浪潮集团' },
            { amcode: 'ZC010005', amname: '奥迪轿车5', posid: '2', pos: [117.042573, 36.644716], compname: '浪潮集团' },
            { amcode: 'ZC010006', amname: '奥迪轿车6', posid: '2', pos: [117.179313, 39.114672], compname: '浪潮集团' },
            { amcode: 'ZC010007', amname: '奥迪轿车7', posid: '2', pos: [117.179313, 39.114672], compname: '浪潮集团' },
            { amcode: 'ZC010008', amname: '奥迪轿车8', posid: '2', pos: [117.179313, 39.114672], compname: '浪潮集团' },
            { amcode: 'ZC010009', amname: '奥迪轿车9', posid: '2', pos: [117.179313, 39.114672], compname: '浪潮集团' },
            { amcode: 'ZC010010', amname: '奥迪轿车10', posid: '2', pos: [117.179313, 39.114672], compname: '浪潮集团' }
        ],
        '22': [
            { amcode: 'ZC010001', amname: '奥迪轿车1', posid: '2', pos: [117.179313, 39.114672], compname: '浪潮集团' }
        ]
    },
    GetCompByName: {
        '浪潮国际': [
            { id: '11', code: '0001', name: '浪潮国际' },
            { id: '33', code: '0002', name: '浪潮国际123' },
            { id: '13', code: '0001', name: '浪潮国际3' },
            { id: '14', code: '0001', name: '浪潮国际4' },
            { id: '15', code: '0001', name: '浪潮国际5' },
            { id: '16', code: '0001', name: '浪潮国际6' },
            { id: '17', code: '0001', name: '浪潮国际7' },
            { id: '18', code: '0001', name: '浪潮国际8' },
            { id: '19', code: '0001', name: '浪潮国际9' },
            { id: '10', code: '0001', name: '浪潮国际0' }
        ],
        '浪潮软件': [
            { id: '22', code: '0002', name: '浪潮软件' }
        ]
    }


}