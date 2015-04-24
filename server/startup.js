var nodes = [
{
  'tag':'skill', 
  'name': '技术',
  'peak': true,
  'display': true,
  'sub': [
  {
    'tag' :'meteor',
    'display': true,
    'name':'Meteor'
  },
  {
    'tag' :'programmer',
    'display': true,
    'name':'程序员'
  },
  {
    'tag' :'js',
    'display': false,
    'name':'Javascript'
  }
  ]
},
{
  'tag' : 'creative',
  'name': '创意',
  'peak': false,
  'display': true,
  'sub': [
  {
    'tag' :'share',
    'display': true,
    'name':'分享创造'
  },
  {
    'tag' :'design',
    'display': true,
    'name':'设计'
  },
  {
    'tag' :'idea',
    'display': true,
    'name':'奇思妙想'
  }
  ]
}
];

if(Nodes.find().count() < 1){
  nodes.forEach(function(e){
    Nodes.insert(e);
  });
}

