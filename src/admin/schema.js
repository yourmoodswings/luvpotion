export const schemas={
 pages:{label:'Page copy',fields:{name:'text',slug:'text',eyebrow:'text',title:'textarea',description:'textarea',body:'textarea',hero:'image'}},
 products:{label:'Products',fields:{name:'text',slug:'text',collection:'text',category:'text',price:'number',stock:'number',photo:'image',description:'textarea',artistId:'text',chapterIndex:'number',saleMode:['fixed','auction'],sizes:'text',material:'text',dimensions:'text',edition:'text',condition:'text',care:'textarea',shipping:'textarea',sample:'boolean',ready:'boolean'}},
 artists:{label:'Artists',fields:{name:'text',bio:'textarea',discipline:'text',photo:'image',chapters:'text'}},
 chapters:{label:'Story chapters',fields:{name:'text',term:'text',title:'text',chapterTitle:'text',quote:'textarea',narrative:'textarea',artwork:'image',portrait:'image',film:'video',narration:'audio',captions:'captions'}},
 exhibitions:{label:'Exhibitions',fields:{name:'text',slug:'text',eyebrow:'text',description:'textarea',hero:'image',statement:'textarea',priceNote:'text'}},
 settings:{label:'Site content',fields:{name:'text',homeTitle:'text',homeEmphasis:'text',homeIntro:'textarea',manifestoTitle:'text',manifesto:'textarea',footerLine:'text',footerEmphasis:'text',announcement:'text',contactEmail:'text',shopIntro:'textarea'}},
 auctions:{label:'Auction lots',fields:{name:'text',productId:'text',startsAt:'datetime-local',endsAt:'datetime-local',increment:'number',enabled:'boolean',mode:['preview','live'],terms:'textarea',delivery:'textarea'}},
};
