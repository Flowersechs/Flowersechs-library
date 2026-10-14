(function(){
'use strict';

      var LS='flowersechs-library-v1', LSUI='flowersechs-library-ui';
    
      var STATUS={reading:'Lendo',want:'Quero ler',done:'Lido',dropped:'Abandonado'};
    
      var COLS=[['all','Todos os livros'],['reading','Lendo'],['want','Quero ler'],['done','Lidos'],['dropped','Abandonados'],['fav','Favoritos']];
    
      var HUES=[8,28,48,95,165,200,235,275,320];
    
      var DAY=86400000;

    var ico={
      play:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z"/></svg>',
    
      star:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2.8 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.6 6.1 20.8l1.2-6.5L2.5 9.7l6.6-.9z"/></svg>',
    
      starS:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2.8 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.6 6.1 20.8l1.2-6.5L2.5 9.7l6.6-.9z"/></svg>',
    
      up:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 10v10H3V10zM7 10l4-7a2 2 0 0 1 2 2v4h6.5a2 2 0 0 1 2 2.3l-1.4 8a2 2 0 0 1-2 1.7H7"/></svg>',
    
      down:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 14V4h4v10zM17 14l-4 7a2 2 0 0 1-2-2v-4H4.5a2 2 0 0 1-2-2.3l1.4-8A2 2 0 0 1 5.900 3H17"/></svg>',
   
      back:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>',
    
      heart:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-8-5.200-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 20 10c0 5.800-8 11-8 11z"/></svg>',
    
      next:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>',
    
      trophy:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4h8v6a4 4 0 0 1-8 0zM8 6H4a3 3 0 0 0 4 4M16 6h4a3 3 0 0 1-4 4M12 14v4M8.500 21h7"/></svg>'
  };


      function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
    
      function $(id){return document.getElementById(id)}
    
      function clone(o){return JSON.parse(JSON.stringify(o))}

  function rel(ts){
  if(!ts)return 'Nunca';
  var d=Math.floor((Date.now()-ts)/DAY);
  if(d<=0)return 'Hoje'; if(d===1)return 'Ontem'; if(d<30)return 'Há '+d+' dias';
  var m=Math.floor(d/30); return m===1?'Há 1 mês':'Há '+m+' meses';
}

  function dur(min){
  min=Math.round(min); var h=Math.floor(min/60), m=min%60;
  return h?(h+' h'+(m?' '+m+' min':'')):(m+' min');
}
  
    function num(n){return new Intl.NumberFormat('pt-BR').format(n)}
  
    function pct(b){return b.pages?Math.min(100,Math.round(b.read/b.pages*100)):0}
  
    function find(id){for(var i=0;i<books.length;i++)if(books[i].id===id)return books[i];return null}

  function seed(){
  var n=Date.now();
  
  
        function S(id,title,author,year,genre,pages,read,status,hue,pat,font,desc,x){
        var b={id:id,title:title,author:author,year:year,genre:genre,pages:pages,read:read,status:status,hue:hue,pattern:pat,font:font,desc:desc,
          minutes:Math.round(read*1.8),fav:false,rec:null,note:'',last:null,added:n-60*DAY,example:true};
        for(var k in (x||{}))b[k]=x[k];
        return b;
      }
    
      return [
        S('s1','Grande Sertão: Veredas','João Guimarães Rosa',1956,'Romance',590,212,'reading',38,1,0,'Um ex-jagunço conta sua vida a um visitante, misturando amor, guerra e dúvida sobre o bem e o mal, em uma linguagem que reinventa o português do sertão.',{last:n-1*DAY,added:n-40*DAY,note:'Ler em voz alta ajuda muito nos trechos mais longos.'}),
        
        S('s2','Duna','Frank Herbert',1965,'Ficção científica',680,340,'reading',28,2,1,'Em um planeta desértico onde se produz a substância mais valiosa do universo, uma família nobre é lançada em uma disputa por poder, religião e sobrevivência.',{last:n-2*DAY,added:n-30*DAY,fav:true}),
        
        S('s3','Cem Anos de Solidão','Gabriel García Márquez',1967,'Realismo mágico',448,96,'reading',165,0,0,'A saga da família Buendía na cidade de Macondo, onde o extraordinário acontece com a naturalidade do dia a dia, ao longo de várias gerações.',{last:n-6*DAY,added:n-20*DAY}),
       
        S('s4','Dom Casmurro','Machado de Assis',1899,'Clássico',256,256,'done',235,3,0,'Bentinho narra sua vida e tenta decidir se Capitu o traiu. O leitor termina sem certeza, e esse é o jogo do livro.',{last:n-45*DAY,added:n-90*DAY,rec:true,fav:true,minutes:430,note:'Reler o capítulo do olhar de ressaca.'}),
       
        S('s5','Memórias Póstumas de Brás Cubas','Machado de Assis',1881,'Clássico',240,240,'done',275,1,0,'Um defunto autor resolve contar a própria vida com ironia, digressões e muito pouca pena de si mesmo e dos outros.',{last:n-120*DAY,added:n-150*DAY,rec:true,minutes:390}),
       
        S('s6','1984','George Orwell',1949,'Distopia',416,416,'done',8,2,2,'Em um Estado que vigia tudo, um funcionário do governo começa a duvidar da versão oficial dos fatos e paga caro por isso.',{last:n-200*DAY,added:n-230*DAY,rec:true,minutes:700}),
        
        S('s7','O Hobbit','J. R. R. Tolkien',1937,'Fantasia',320,320,'done',95,0,0,'Bilbo Bolseiro, um hobbit caseiro, é convidado a acompanhar anões numa viagem para recuperar um tesouro guardado por um dragão.',{last:n-300*DAY,added:n-330*DAY,rec:true,minutes:520}),
        
        S('s8','Fahrenheit 451','Ray Bradbury',1953,'Distopia',200,200,'done',28,3,1,'Num futuro em que livros são proibidos e queimados, um bombeiro que acende fogueiras começa a se perguntar o que há dentro deles.',{last:n-180*DAY,added:n-210*DAY,rec:true,minutes:340}),
        
        S('s9','Capitães da Areia','Jorge Amado',1937,'Romance',280,280,'done',48,2,2,'Um grupo de meninos de rua em Salvador vive de pequenos roubos e de lealdade entre si, sob os olhos de uma cidade que prefere não ver.',{last:n-250*DAY,added:n-280*DAY,minutes:480}),
        
        S('s10','A Hora da Estrela','Clarice Lispector',1977,'Romance',88,0,'want',320,0,0,'A história de Macabéa, datilógrafa nordestina no Rio de Janeiro, contada por um narrador que se questiona sobre o direito de contá-la.',{added:n-15*DAY}),
        
        S('s11','Neuromancer','William Gibson',1984,'Ficção científica',320,0,'want',200,3,1,'Um hacker aposentado é recrutado para um último trabalho em um mundo de corporações, inteligências artificiais e redes de computadores.',{added:n-12*DAY}),
        
        S('s12','O Nome da Rosa','Umberto Eco',1980,'Mistério',592,0,'want',8,1,0,'Um frade franciscano investiga mortes misteriosas em uma abadia medieval cheia de segredos, debates teológicos e uma biblioteca labiríntica.',{added:n-10*DAY}),
        
        S('s13','Orgulho e Preconceito','Jane Austen',1813,'Clássico',424,0,'want',320,2,0,'Elizabeth Bennet e o orgulhoso Sr. Darcy precisam rever o que pensam um do outro em uma sociedade que mede casamentos como negócios.',{added:n-8*DAY}),
        
        S('s14','Sapiens','Yuval Noah Harari',2011,'Não ficção',464,120,'dropped',200,1,2,'Um panorama da história da espécie humana, da vida de caçadores-coletores até a era da ciência e da tecnologia.',{last:n-70*DAY,added:n-100*DAY,rec:false,minutes:230})
      ];

  
  }


    var books=null;
    
    var ui={tab:'lib',sel:null,col:'all',q:'',sort:'recent',tile:150,session:false,confirmDel:false,ssel:null,sq:'',sgenre:'all',sfeat:0};
    
    var LSW='flowersechs-library-wish';
    
    var wish=[];
    
    try{var w=JSON.parse(localStorage.getItem(LSW)||'[]'); if(Array.isArray(w))wish=w;}catch(e){}
    
    try{var u=JSON.parse(localStorage.getItem(LSUI)||'{}'); if(u.sort)ui.sort=u.sort; if(u.tile)ui.tile=u.tile;}catch(e){}
    
    try{var raw=localStorage.getItem(LS); if(raw){var p=JSON.parse(raw); if(Array.isArray(p))books=p;}}catch(e){}
    
    if(!books)books=seed();


  
  function persist(){
    try{localStorage.setItem(LS,JSON.stringify(books));$('sync').setAttribute('data-s','ok');$('synctxt').textContent='Salvo neste navegador'}
    catch(e){$('sync').setAttribute('data-s','local');$('synctxt').textContent='Não foi possível salvar'}
  }

        function saveWish(){try{localStorage.setItem(LSW,JSON.stringify(wish))}catch(e){}}


    function cover(b,mini){
    return '<div class="cover p'+(b.pattern%4)+' f'+(b.font%3)+(mini?' mini':'')+'" style="--h:'+(+b.hue||200)+'">'+
      '<div class="ci"><span class="ct">'+esc(b.title)+'</span><span class="ca">'+esc(b.author)+'</span></div></div>';
  }


    function inCol(b,c){
      if(c==='all')return true; if(c==='fav')return !!b.fav; return b.status===c;
    }
  
      function visible(){
              var q=ui.q.trim().toLowerCase();
              
              var out=books.filter(function(b){
                
              return inCol(b,ui.col)&&(!q||(b.title+' '+b.author).toLowerCase().indexOf(q)>-1);
            });
              
              var s=ui.sort;
              
              out.sort(function(a,b){
                
                  if(s==='az')return a.title.localeCompare(b.title,'pt-BR');
                
                  if(s==='author')return a.author.localeCompare(b.author,'pt-BR')||a.title.localeCompare(b.title,'pt-BR');
                  
                  if(s==='progress')return pct(b)-pct(a);
                
              return (b.last||0)-(a.last||0)||(b.added||0)-(a.added||0);
            });
            
              return out;
      }


    function renderCols(){
      $('cols').innerHTML=COLS.map(function(c){
        
          var n=books.filter(function(b){return inCol(b,c[0])}).length;
         
          return '<button class="col" type="button" data-act="col" data-v="'+c[0]+'"'+(ui.col===c[0]&&!ui.sel?' aria-current="true"':'')+'><span>'+c[1]+'</span><em>'+n+'</em></button>';
        
      }).join('');
    }
  
    function renderList(){
      
        var list=visible();
      
          $('listlbl').textContent=COLS.filter(function(c){return c[0]===ui.col})[0][1]+' ('+list.length+')';
        
          $('list').innerHTML=list.length?list.map(function(b){
        
        return '<button class="li" type="button" data-act="open" data-v="'+esc(b.id)+'"'+(ui.sel===b.id?' aria-current="true"':'')+'>'+cover(b,true)+'<span>'+esc(b.title)+'</span>'+(b.status==='reading'?'<i class="dot" title="Lendo"></i>':'')+'</button>';
      
        }).join(''):'<div class="empty-side">Nenhum livro encontrado.</div>';
    }


function tile(b){
    var p=pct(b);
  
    var cap=b.status==='done'?'Lido':(b.read>0?num(b.read)+' de '+num(b.pages)+' págs.':num(b.pages)+' págs.');
  
    return '<button class="tile" type="button" data-act="open" data-v="'+esc(b.id)+'" aria-label="Abrir '+esc(b.title)+'">'+
      '<div class="tcover">'+cover(b)+
      
      (b.fav?'<span class="favmark">'+ico.starS+'</span>':'')+
      '<span class="badge '+b.status+'">'+STATUS[b.status]+'</span>'+
      
      (p>0?'<span class="bar"><i style="width:'+p+'%"></i></span>':'')+
      '</div><span class="tcap">'+esc(cap)+'</span></button>';
}

  
  function renderHome(){
        var list=visible();
    
        var recent=books.filter(function(b){return b.status==='reading'}).sort(function(a,b){return (b.last||0)-(a.last||0)});
        
        var totalRead=books.reduce(function(s,b){return s+(+b.read||0)},0);
        
        var totalMin=books.reduce(function(s,b){return s+(+b.minutes||0)},0);
        
        var done=books.filter(function(b){return b.status==='done'}).length;
        
        var colName=COLS.filter(function(c){return c[0]===ui.col})[0][1];
        
        var html='<div class="pad">';
        
          html+='<div class="summary"><div><b>'+books.length+'</b><span>Livros</span></div><div><b>'+done+'</b><span>Lidos</span></div><div><b>'+num(totalRead)+'</b><span>Páginas lidas</span></div><div><b>'+dur(totalMin)+'</b><span>Tempo de leitura</span></div></div>';
        
        if(ui.col==='all'&&!ui.q.trim()&&recent.length){
          
          html+='<section><div class="sec-h"><h2>Continuar lendo</h2></div><div class="shelf">'+recent.map(tile).join('')+'</div></section>';
    }
  
    html+='<section><div class="sec-h"><h2><b>'+esc(colName)+'</b> ('+list.length+')</h2><div class="tools">'+
    
      '<label>Ordenar por <select id="sort" aria-label="Ordenar">'+
      
      [['recent','Leitura recente'],['az','Título A–Z'],['author','Autor'],['progress','Progresso']].map(function(o){return '<option value="'+o[0]+'"'+(ui.sort===o[0]?' selected':'')+'>'+o[1]+'</option>'}).join('')+
        '</select></label>'+
    
        '<label>Tamanho <input id="tile" type="range" min="100" max="240" step="10" value="'+ui.tile+'" aria-label="Tamanho das capas"></label></div></div>';
  
            html+=list.length?'<div class="grid" id="grid" style="--tile:'+ui.tile+'px">'+list.map(tile).join('')+'</div>':'<p class="nores">Nenhum livro nesta coleção'+(ui.q.trim()?' para esta busca':'')+'.</p>';
            
            html+='</section></div>';
    $('main').innerHTML=html;
}


  var ACH=[
        
        ['start','Primeira página','Registre sua primeira página lida',function(b){return b.read>0}],
            
        ['q1','Um quarto do caminho','Chegue a 25% do livro',function(b){return pct(b)>=25}],
            
        ['half','Meio caminho','Chegue a 50% do livro',function(b){return pct(b)>=50}],
            
        ['late','Reta final','Chegue a 90% do livro',function(b){return pct(b)>=90}],
            
        ['end','Última página','Termine o livro',function(b){return b.status==='done'}],
            
        ['note','Anotador','Escreva uma nota sobre o livro',function(b){return (b.note||'').trim().length>0}],
            
        ['fav','Estante de honra','Marque como favorito',function(b){return !!b.fav}],
            
        ['rev','Veredito','Diga se recomenda o livro',function(b){return b.rec!==null}]
  
  ];

  
  function renderDetail(b){
  
    var p=pct(b);
  
    var rate=b.read>0&&b.minutes>0?b.minutes/b.read:1.8;
  
    var left=Math.max(0,b.pages-b.read);
  
    var unlocked=ACH.filter(function(a){return a[3](b)}).length;
  
    var label=b.status==='done'?'RELER':(b.read>0?'CONTINUAR':'COMEÇAR');
  
    var h='<div style="--h:'+(+b.hue||200)+'">';
  
    h+='<section class="hero">'+cover(b)+'<div class="info"><button class="back" type="button" data-act="home">'+ico.back+' Biblioteca</button>'+
    
      '<h1>'+esc(b.title)+'</h1><div class="by">'+esc(b.author)+(b.year?' · '+esc(b.year):'')+'</div>'+
    
      '<div class="tags"><span class="tag">'+esc(b.genre||'Outro')+'</span><span class="tag">'+num(b.pages)+' páginas</span>'+(b.example?'<span class="tag ex">Exemplo</span>':'')+'</div></div></section>';
  
    h+='<div class="actions">'+
    
      '<button class="btn green big" type="button" data-act="read">'+ico.play+' '+label+'</button>'+
    
      '<div class="seg"><label for="st">Coleção</label><select id="st" data-act="status">'+Object.keys(STATUS).map(function(k){return '<option value="'+k+'"'+(b.status===k?' selected':'')+'>'+STATUS[k]+'</option>'}).join('')+'</select></div>'+
    
      '<div class="sp"></div>'+
    
      '<div class="verdict"><button class="iconbtn" type="button" data-act="rec" data-v="yes" aria-pressed="'+(b.rec===true)+'" title="Recomendo" aria-label="Recomendo">'+ico.up+'</button>'+
    
      '<button class="iconbtn" type="button" data-act="rec" data-v="no" aria-pressed="'+(b.rec===false)+'" title="Não recomendo" aria-label="Não recomendo">'+ico.down+'</button>'+
    
      '<button class="iconbtn fav" type="button" data-act="fav" aria-pressed="'+(!!b.fav)+'" title="Favorito" aria-label="Favorito">'+ico.star+'</button></div></div>';

    
    if(ui.session){
    
      h+='<div class="session"><div class="field"><label for="s-page">Página atual</label><input id="s-page" type="number" min="0" max="'+b.pages+'" value="'+b.read+'"></div>'+
      
      '<div class="field"><label for="s-min">Minutos lidos agora</label><input id="s-min" type="number" min="0" max="1440" value="30"></div>'+
      
      '<button class="btn blue" type="button" data-act="savesession">Registrar leitura</button><button class="btn flat" type="button" data-act="read">Fechar</button></div>';
  }
  
    h+='<div class="stats"><div class="stat prog"><span>Progresso</span><b>'+num(b.read)+' de '+num(b.pages)+' págs. · '+p+'%</b><div class="track"><i style="width:'+p+'%"></i></div></div>'+
    
      '<div class="stat"><span>Tempo de leitura</span><b>'+dur(b.minutes||0)+'</b></div>'+
    
      '<div class="stat"><span>Restante</span><b>'+(left?'≈ '+dur(left*rate):'—')+'</b></div>'+
    
      '<div class="stat"><span>Última leitura</span><b>'+rel(b.last)+'</b></div></div>';
  
    h+='<div class="cols2"><div>'+
    
      '<div class="box"><h3>Sobre este livro</h3><p>'+(b.desc?esc(b.desc):'<span style="color:var(--fg2)">Sem descrição.</span>')+'</p></div>'+
    
      '<div class="box"><h3>Minhas notas</h3><textarea class="note" id="note" aria-label="Minhas notas" placeholder="Citações, ideias, o que você achou até aqui…">'+esc(b.note||'')+'</textarea></div>'+
    
      '<div class="box delrow">'+(ui.confirmDel?'<span>Remover este livro da biblioteca?</span><button class="btn danger" type="button" data-act="deldo">Remover</button><button class="btn flat" type="button" data-act="delcancel">Cancelar</button>':'<button class="btn flat" type="button" data-act="askdel">Remover da biblioteca</button>')+'</div>'+
    
      '</div><div><div class="box"><h3>Conquistas</h3><div class="achsum"><span>'+unlocked+' de '+ACH.length+' desbloqueadas</span><span>'+Math.round(unlocked/ACH.length*100)+'%</span></div><div class="track" style="margin:0 0 10px"><i style="width:'+Math.round(unlocked/ACH.length*100)+'%"></i></div><div class="ach">'+
    
      ACH.map(function(a){var on=a[3](b);return '<div class="ac'+(on?'':' lock')+'">'+ico.trophy+'<div><b>'+a[1]+'</b><span>'+a[2]+'</span></div></div>'}).join('')+
    '</div></div></div></div></div>';
  
    $('main').innerHTML=h;
}

    function renderMain(){
      
        var b=ui.sel&&find(ui.sel);
      
        if(ui.sel&&!b)ui.sel=null;
      
          $('app').classList.toggle('has-sel',!!b);
      
        if(b)renderDetail(b);else renderHome();
      
    }
  
    function renderAll(){
      
        var store=ui.tab==='store';
        
            $('app').classList.toggle('in-store',store);
          
            $('tab-store').setAttribute('aria-current',store?'true':'false');
          
            $('tab-lib').setAttribute('aria-current',store?'false':'true');
        
        if(store){$('app').classList.remove('has-sel');renderStore();return}
        renderCols();renderList();renderMain();
    }


    function T(id,title,author,year,genre,pages,hue,pat,font,desc){return {id:id,title:title,author:author,year:year,genre:genre,pages:pages,hue:hue,pattern:pat,font:font,desc:desc}}

  var STORE=[
  
      T('t1','O Pequeno Príncipe','Antoine de Saint-Exupéry',1943,'Fábula',96,48,0,0,'Um piloto perdido no deserto conhece um menino vindo de outro planeta, que conta suas viagens e o que aprendeu sobre amizade e sobre os adultos.'),
    
      T('t2','O Senhor dos Anéis: A Sociedade do Anel','J. R. R. Tolkien',1954,'Fantasia',576,95,2,0,'Frodo herda um anel perigoso e parte com companheiros numa jornada para destruí-lo antes que o inimigo o recupere.'),
    
      T('t3','Admirável Mundo Novo','Aldous Huxley',1932,'Distopia',312,200,3,1,'Uma sociedade estável e feliz graças ao condicionamento e às drogas leves mostra o preço de ter tudo resolvido de antemão.'),
    
      T('t4','Frankenstein','Mary Shelley',1818,'Terror',280,165,1,0,'Um cientista dá vida a uma criatura feita de partes de corpos e foge da responsabilidade pelo que criou.'),
    
      T('t5','Drácula','Bram Stoker',1897,'Terror',488,8,2,0,'Cartas e diários contam a chegada do conde Drácula à Inglaterra e a tentativa de um grupo de amigos de detê-lo.'),
    
      T('t6','Crime e Castigo','Fiódor Dostoiévski',1866,'Clássico',576,235,1,1,'Um estudante pobre comete um assassinato em São Petersburgo e passa a ser consumido pela culpa e pelo medo de ser descoberto.'),
    
      T('t7','A Revolução dos Bichos','George Orwell',1945,'Distopia',152,28,0,2,'Os animais de uma fazenda expulsam o dono e tentam criar uma sociedade igualitária, até que alguns se tornam mais iguais que outros.'),
    
      T('t8','Ensaio sobre a Cegueira','José Saramago',1995,'Romance',312,320,3,0,'Uma epidemia de cegueira branca atinge uma cidade inteira e testa os limites da convivência entre as pessoas isoladas.'),
    
      T('t9','Vidas Secas','Graciliano Ramos',1938,'Romance',176,38,2,1,'Uma família de retirantes atravessa o sertão em busca de sobrevivência, com poucas palavras e muita dureza.'),
    
      T('t10','Os Sertões','Euclides da Cunha',1902,'Não ficção',560,48,1,0,'Reportagem, ensaio e narrativa sobre a Guerra de Canudos, com descrições da terra, do povo e do conflito.'),
    
      T('t11','O Conto da Aia','Margaret Atwood',1985,'Distopia',368,8,3,2,'Em um regime que controla os corpos das mulheres, uma aia relembra a vida anterior e tenta sobreviver ao presente.'),
    
      T('t12','Fundação','Isaac Asimov',1951,'Ficção científica',256,235,0,1,'Um matemático prevê a queda de um império galáctico e cria uma fundação para encurtar os séculos de caos que virão.'),
    
      T('t13','O Morro dos Ventos Uivantes','Emily Brontë',1847,'Romance',400,275,2,0,'Uma paixão intensa e destrutiva entre Heathcliff e Catherine atravessa duas gerações numa casa isolada na charneca inglesa.'),
    
      T('t14','Vinte Mil Léguas Submarinas','Júlio Verne',1870,'Ficção científica',400,200,1,2,'Um professor é levado a bordo do submarino Nautilus, comandado pelo enigmático capitão Nemo, numa volta pelos oceanos.'),
    
      T('t15','A Metamorfose','Franz Kafka',1915,'Clássico',96,95,0,2,'Gregor Samsa acorda transformado em inseto e vê a família reagir ao que isso muda na rotina da casa.'),
    
      T('t16','Perto do Coração Selvagem','Clarice Lispector',1943,'Romance',200,320,1,0,'Joana, da infância à vida adulta, busca liberdade e um jeito próprio de sentir, em fragmentos de memória e pensamento.'),
    
      T('t17','Hábitos Atômicos','James Clear',2018,'Não ficção',320,165,3,2,'Um método prático para criar bons hábitos e abandonar os ruins por meio de mudanças pequenas e constantes.'),
    
      T('t18','O Alquimista','Paulo Coelho',1988,'Romance',208,48,0,2,'Um pastor andaluz atravessa o deserto atrás de um tesouro e descobre o que realmente procurava.')
  ];
  
var FEATURED=['t7','t2','t3','t5'];

  function sget(id){for(var i=0;i<STORE.length;i++)if(STORE[i].id===id)return STORE[i];return null}

  function ownedBook(id){for(var i=0;i<books.length;i++)if(books[i].storeId===id)return books[i];return null}

  function wished(id){return wish.indexOf(id)>-1}

  function addFromStore(s){
  
      if(ownedBook(s.id))return;
    
        books.unshift({id:'u'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),storeId:s.id,title:s.title,author:s.author,year:s.year,genre:s.genre,pages:s.pages,
      
                   read:0,status:'want',hue:s.hue,pattern:s.pattern,font:s.font,desc:s.desc,minutes:0,fav:false,rec:null,note:'',last:null,added:Date.now()});
    
        wish=wish.filter(function(x){return x!==s.id});
    
          persist(); saveWish();
}
  
    function storeItems(){
      
      var q=ui.sq.trim().toLowerCase();
      
        return STORE.filter(function(s){
        
            if(ui.sgenre==='wish'&&!wished(s.id))return false;
          
            if(ui.sgenre!=='all'&&ui.sgenre!=='wish'&&s.genre!==ui.sgenre)return false;
        
        return !q||(s.title+' '+s.author).toLowerCase().indexOf(q)>-1;
      });
    }

  
    function scard(s){
      
      var own=!!ownedBook(s.id);
      
        return '<button class="tile" type="button" data-act="sopen" data-v="'+s.id+'" aria-label="Ver '+esc(s.title)+' na loja">'+
        
            '<div class="tcover">'+cover(s)+(wished(s.id)?'<span class="favmark heart">'+ico.heart+'</span>':'')+(own?'<span class="badge owned">Na biblioteca</span>':'')+'</div>'+
          
            '<span class="tcap">'+esc(s.author)+'</span></button>';
    }
  
  function addBtns(s,cls){
    
      var own=ownedBook(s.id);
      
      return (own?'<button class="btn blue big" type="button" data-act="sgo" data-v="'+s.id+'">Ver na biblioteca</button>':'<button class="btn green big" type="button" data-act="sadd" data-v="'+s.id+'">+ Adicionar à biblioteca</button>')+
      
        (own?'':'<button class="btn ghost big" type="button" data-act="swish" data-v="'+s.id+'" aria-pressed="'+wished(s.id)+'">'+ico.heart+' '+(wished(s.id)?'Na lista de desejos':'Lista de desejos')+'</button>');
  }

        function renderStoreGrid(){
        
            var list=storeItems();
        
              $('scount').textContent='('+list.length+')';
        
              $('sgrid').innerHTML=list.length?list.map(scard).join(''):'<p class="nores">Nenhum livro encontrado.</p>';
        }

  
  function renderStore(){
  
      if(ui.ssel){renderStoreDetail();return}
  
        var f=sget(FEATURED[ui.sfeat%FEATURED.length]);
  
        var genres=[]; STORE.forEach(function(s){if(genres.indexOf(s.genre)<0)genres.push(s.genre)}); genres.sort(function(a,b){return a.localeCompare(b,'pt-BR')});
  
        var chips=[['all','Todos'],['wish','Lista de desejos ('+wish.length+')']].concat(genres.map(function(g){return [g,g]}));
  
        var h='<div style="--h:'+f.hue+'"><section class="hero">'+cover(f)+'<div class="info">'+
    
            '<span class="kicker">Destaque da loja</span><h1>'+esc(f.title)+'</h1><div class="by">'+esc(f.author)+' · '+f.year+'</div>'+
    
            '<div class="tags"><span class="tag">'+esc(f.genre)+'</span><span class="tag">'+num(f.pages)+' páginas</span></div>'+
    
            '<p class="desc">'+esc(f.desc)+'</p><div class="btns">'+addBtns(f)+'<button class="btn ghost big" type="button" data-act="sopen" data-v="'+f.id+'">Ver detalhes</button></div></div>'+
    
            '<div class="fnav"><button type="button" data-act="sfeat" data-v="-1" aria-label="Destaque anterior">'+ico.back+'</button>'+
    
              FEATURED.map(function(_,i){return '<button class="dot" type="button" data-act="sfeat" data-v="='+i+'" aria-label="Destaque '+(i+1)+'"'+(i===ui.sfeat%FEATURED.length?' aria-current="true"':'')+'></button>'}).join('')+
    
            '<button type="button" data-act="sfeat" data-v="1" aria-label="Próximo destaque">'+ico.next+'</button></div></section>'+
    
            '<div class="pad"><section><div class="sec-h"><h2><b>Explorar</b> <span id="scount"></span></h2><div class="ssearch"><input id="sq" type="search" placeholder="Buscar na loja" aria-label="Buscar na loja" value="'+esc(ui.sq)+'" autocomplete="off"></div></div>'+
    
            '<div class="chips" style="margin-bottom:16px">'+chips.map(function(c){return '<button class="chip" type="button" data-act="sgenre" data-v="'+esc(c[0])+'" aria-pressed="'+(ui.sgenre===c[0])+'">'+esc(c[1])+'</button>'}).join('')+'</div>'+
    
            '<div class="grid" id="sgrid" style="--tile:150px"></div><p class="note-ex" style="margin-top:20px">Catálogo de exemplo. Os livros adicionados passam a fazer parte da sua biblioteca.</p></section></div></div>';
  
    $('main').innerHTML=h; renderStoreGrid();
}

  function renderStoreDetail(){
  
      var s=sget(ui.ssel); if(!s){ui.ssel=null;renderStore();return}
  
      var same=STORE.filter(function(x){return x.genre===s.genre&&x.id!==s.id});
  
      var more=same.concat(STORE.filter(function(x){return x.genre!==s.genre&&x.id!==s.id})).slice(0,4);
  
      var moreTitle=same.length?'Mais em '+s.genre:'Você também pode gostar';
  
      var h='<div style="--h:'+s.hue+'"><section class="hero">'+cover(s)+'<div class="info"><button class="back" type="button" data-act="sback">'+ico.back+' Loja</button>'+
    
          '<h1>'+esc(s.title)+'</h1><div class="by">'+esc(s.author)+' · '+s.year+'</div><div class="tags"><span class="tag">'+esc(s.genre)+'</span><span class="tag">'+num(s.pages)+' páginas</span></div>'+
    
          '<div class="btns">'+addBtns(s)+'</div></div></section>'+
    
          '<div class="cols2"><div><div class="box"><h3>Sobre este livro</h3><p>'+esc(s.desc)+'</p></div>'+
    
          '<div class="box"><h3>Detalhes</h3><dl class="kv"><dt>Autor</dt><dd>'+esc(s.author)+'</dd><dt>Ano</dt><dd>'+s.year+'</dd><dt>Gênero</dt><dd>'+esc(s.genre)+'</dd><dt>Páginas</dt><dd>'+num(s.pages)+'</dd></dl></div></div>'+
    
          '<div><div class="box"><h3>'+esc(moreTitle)+'</h3><div class="mini-grid">'+more.map(scard).join('')+'</div></div></div></div></div>';
 
    $('main').innerHTML=h;
}

      function mutate(fn){fn();persist();renderAll()}
  
  function pushStatus(b,st){
      
      b.status=st;
      
      if(st==='done'&&b.read<b.pages)b.read=b.pages;
      
      if(st==='done'&&!b.last)b.last=Date.now();
  }

  
  function act(name,v,el){
    
    var b=ui.sel&&find(ui.sel);
    
      switch(name){
          case 'home': ui.sel=null; ui.session=false; ui.confirmDel=false; renderAll(); $('main').scrollTop=0; window.scrollTo(0,0); break;
          
          case 'col': ui.col=v; ui.sel=null; ui.session=false; renderAll(); $('main').scrollTop=0; break;
          
          case 'open': ui.sel=v; ui.session=false; ui.confirmDel=false; renderAll(); $('main').scrollTop=0; window.scrollTo(0,0); break;
          
          case 'read': ui.session=!ui.session; renderMain(); break;
          
          case 'savesession':
            
              if(!b)break;
            
                var pg=Math.max(0,Math.min(b.pages,parseInt($('s-page').value,10)||0));
            
                var mn=Math.max(0,Math.min(1440,parseInt($('s-min').value,10)||0));
              
                  b.read=pg; b.minutes=(b.minutes||0)+mn; b.last=Date.now();
            
                    if(b.read>=b.pages)pushStatus(b,'done');
            
                      else if(b.status==='want'||b.status==='done'||b.status==='dropped')b.status='reading';
            
                ui.session=false; persist(); renderAll(); break;
          
          case 'fav': if(b)mutate(function(){b.fav=!b.fav}); break;
          
          case 'rec': if(b)mutate(function(){var t=v==='yes'; b.rec=(b.rec===t)?null:t}); break;
          
          case 'askdel': ui.confirmDel=true; renderMain(); break;
          
          case 'delcancel': ui.confirmDel=false; renderMain(); break;
          
          case 'deldo': if(b){books=books.filter(function(x){return x.id!==b.id}); ui.sel=null; ui.confirmDel=false; persist(); renderAll();} break;
          
          case 'tab': ui.tab=v; ui.ssel=null; ui.session=false; ui.confirmDel=false; renderAll(); $('main').scrollTop=0; window.scrollTo(0,0); break;
          
          case 'sopen': ui.ssel=v; renderStore(); $('main').scrollTop=0; window.scrollTo(0,0); break;
          
          case 'sback': ui.ssel=null; renderStore(); $('main').scrollTop=0; break;
          
          case 'sgenre': ui.sgenre=v; renderStore(); break;
          
          case 'sfeat': var n=FEATURED.length; ui.sfeat=v.charAt(0)==='='?+v.slice(1):((ui.sfeat+(+v))%n+n)%n; renderStore(); break;
          
          case 'sadd': var si=sget(v); if(si){addFromStore(si); renderStore();} break;
          
          case 'swish': if(sget(v)){var wi=wish.indexOf(v); if(wi>-1)wish.splice(wi,1); else wish.push(v); saveWish(); renderStore();} break;
          
          case 'sgo': var ob=ownedBook(v); if(ob){ui.tab='lib'; ui.col='all'; ui.q=''; $('q').value=''; ui.sel=ob.id; ui.session=false; renderAll(); $('main').scrollTop=0; window.scrollTo(0,0);} break;
          
          case 'addopen': openAdd(); break;
          
          case 'addclose': $('ov').hidden=true; break;
          
          case 'addsave': saveAdd(); break;
    
      }
  }

  
  document.addEventListener('click',function(e){
    
    var t=e.target.closest('[data-act]'); if(!t||t.tagName==='SELECT')return;
    
    act(t.getAttribute('data-act'),t.getAttribute('data-v'),t);
  
  });
  
document.addEventListener('change',function(e){
  
  var t=e.target;
  
  if(t.id==='st'){var b=find(ui.sel); if(b)mutate(function(){pushStatus(b,t.value)})}
  
  else if(t.id==='note'){var b2=find(ui.sel); if(b2){b2.note=t.value; persist(); renderCols(); renderMain();}}
  
  else if(t.id==='sort'){ui.sort=t.value; saveUI(); renderList(); renderMain();}

});
  
document.addEventListener('input',function(e){
  
  var t=e.target;
  
  if(t.id==='tile'){ui.tile=+t.value; saveUI(); var g=$('grid'); if(g)g.style.setProperty('--tile',ui.tile+'px');}
  
  else if(t.id==='note'){var b=find(ui.sel); if(b){b.note=t.value; persist();}}
  
  else if(t.id==='sq'){ui.sq=t.value; renderStoreGrid();}
  
  else if(t.id==='q'){ui.q=t.value; if(ui.sel){ui.sel=null;} renderCols(); renderList(); renderMain();}
  
  else if($('form').contains(t)||t.name==='hue'){updatePreview();}

});
  
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!$('ov').hidden)$('ov').hidden=true});
    
        $('ov').addEventListener('mousedown',function(e){if(e.target===$('ov'))$('ov').hidden=true});
    
      function saveUI(){try{localStorage.setItem(LSUI,JSON.stringify({sort:ui.sort,tile:ui.tile}))}catch(e){}}

        $('sw').innerHTML=HUES.map(function(h,i){
  
          return '<label style="--h:'+h+'"><input type="radio" name="hue" value="'+h+'" aria-label="Cor '+(i+1)+'"'+(i===5?' checked':'')+'></label>';

        }).join('');

function formBook(){
  
  var hue=document.querySelector('input[name=hue]:checked');
  
  return {
  
    title:$('f-title').value.trim()||'Título do livro',
    
    author:$('f-author').value.trim()||'Autor',
    
    hue:hue?+hue.value:200, pattern:+$('f-pat').value, font:+$('f-font').value
  
  };
}
  
function updatePreview(){$('pv').innerHTML=cover(formBook())}
  
  function openAdd(){
    
      ['f-title','f-author','f-desc'].forEach(function(id){$(id).value=''});
    
      $('f-pages').value=300; $('f-genre').selectedIndex=0; $('f-status').value='want'; $('f-font').value='0'; $('f-pat').value='0';
    
      var r=document.querySelectorAll('input[name=hue]'); if(r[5])r[5].checked=true;
    
      $('err').textContent=''; updatePreview(); $('ov').hidden=false;
      
      setTimeout(function(){$('f-title').focus()},30);
}

  function saveAdd(){
    
    var title=$('f-title').value.trim(), author=$('f-author').value.trim();
    
    if(!title||!author){$('err').textContent='Preencha o título e o autor.';return}
    
    var pages=Math.max(1,Math.min(5000,parseInt($('f-pages').value,10)||0));
    
    if(!pages){$('err').textContent='Informe o número de páginas.';return}
    
    var f=formBook(), st=$('f-status').value;
    
    var b={id:'u'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),title:title,author:author,year:'',genre:$('f-genre').value,pages:pages,
    
           read:st==='done'?pages:0,status:st,hue:f.hue,pattern:f.pattern,font:f.font,desc:$('f-desc').value.trim(),minutes:0,fav:false,rec:null,note:'',
      
           last:st==='done'?Date.now():null,added:Date.now()};
    
    books.unshift(b); ui.sel=b.id; ui.session=false; ui.confirmDel=false;
    
        $('ov').hidden=true; persist(); renderAll(); $('main').scrollTop=0; window.scrollTo(0,0);
}

  
          renderAll();
          })();
