var nodes = [
{
  'tag':'insurance', 
  'name': '保险',
  'peak': true,
  'display': true,
  'sub': [
  {
    'tag' :'axa',
    'display': true,
    'name':'AXA'
  },
  {
    'tag' :'prudential',
    'display': true,
    'name':'Prudential'
  },
  {
    'tag' :'aia',
    'display': false,
    'name':'AIA'
  }
  ]
},
{
  'tag' : 'creditcard',
  'name': '信用卡',
  'peak': false,
  'display': true,
  'sub': [
  {
    'tag' :'citibank',
    'display': true,
    'name':'Citibank'
  },
  {
    'tag' :'uob',
    'display': true,
    'name':'UOB'
  },
  {
    'tag' :'hsbc',
    'display': true,
    'name':'HSBC'
  }
  ]
}
];

if(Nodes.find().count() < 1){
  nodes.forEach(function(e){
    Nodes.insert(e);
  });
}

