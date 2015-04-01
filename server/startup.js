var nodes = [
    {
        'tag':'skill', 
        'name': '技术',
        'peak': false,
        'sub': [
          {
            'tag' :'meteor',
            'name':'Meteor'
          },
          {
            'tag' :'programmer',
            'name':'程序员'
          }
        ]
    },
    {
        'tag' : 'creative',
        'name': '创意',
        'peak': true,
        'sub': [
          {
            'tag' :'share',
            'name':'分享创造'
          },
          {
            'tag' :'design',
            'name':'设计'
          },
          {
            'tag' :'idea',
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

