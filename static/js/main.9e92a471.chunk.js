(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{71:function(e,t,n){e.exports=n(94)},79:function(e,t,n){},81:function(e,t,n){},94:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(70),l=n.n(r),c=(n(79),n(6)),o=(n(81),n(132)),s=n(131),u=n(130),m=n(112),d=n(110),h=n(93),p=Object(h.a)({palette:{primary:{main:"#eaf1f7"},list:["#eaf1f7","#f2e8f3","#dbf0f1","#FBF8F1"]}}),f=n(103),E=n(104),b=n(129),g=function(e){var t=e.iconData;return i.a.createElement("div",null,t.map(function(e){return i.a.createElement(b.a,{onClick:function(){return t=e.Link,void(window.location.href=t);var t},key:e.Link},e.Icon)}))},v=function(e){var t=e.title,n=e.description,r=e.media,l=e.mediaAlt,o=e.embed,h=e.icons,p=Object(a.useState)(!1),b=Object(c.a)(p,2),v=b[0],w=b[1];Object(a.useEffect)(function(){w(!0)});var y=Object(a.useContext)(P);return i.a.createElement(f.a,{in:v},i.a.createElement(E.a,{direction:"left",in:v},i.a.createElement(m.a,{sx:{borderRadius:"10px",width:"100%"}},i.a.createElement(u.a,null),i.a.createElement(d.a,{container:!0,spacing:2,direction:y?"column":"row",justifyContent:"flex-end"},i.a.createElement(d.a,{xs:10,sx:{paddingLeft:"1rem",paddingTop:"1rem"}},i.a.createElement(s.a,{variant:"h4",sx:{textAlign:"left"}},t),i.a.createElement(u.a,null),i.a.createElement(s.a,{variant:"h6"},n),h&&i.a.createElement(g,{iconData:h})),i.a.createElement(d.a,{xs:y?12:2},i.a.createElement("div",{style:{height:"40vh",width:y?"80%":"15vw",marginRight:y?"0":"-10%",marginTop:y?"0":"-15%"}},r&&i.a.createElement("img",{src:r,alt:l,style:{height:"100%",float:"right",border:"1px solid black"}}),o&&i.a.createElement("div",{style:{border:"1px solid black",height:"99%",width:"100%"}},o)))))))},w=function(e){var t=Object(a.useRef)(null),n=Object(a.useContext)(R),i=(n.currentSection,n.setCurrentSection),r=function(e){var t=Object(a.useState)(!1),n=Object(c.a)(t,2),i=n[0],r=n[1],l=new IntersectionObserver(function(e){var t=Object(c.a)(e,1)[0];return r(t.isIntersecting)},{threshold:[.2,.4,.6,.8]});return Object(a.useEffect)(function(){return l.observe(e.current),function(){l.disconnect()}}),i&&console.log("onScreen!"),i}(t);return Object(a.useEffect)(function(){r&&i(e)},[r,e,i]),t},y=function(e){var t=e.section,n=e.index,r=Object(a.useContext)(P),l=w(t.Title);return i.a.createElement(o.a,{maxWidth:"xl",ref:l},i.a.createElement("div",null,i.a.createElement(s.a,{variant:"h2",sx:{textAlign:"left"},marginBottom:"4rem"},t.Title),i.a.createElement(u.a,null),i.a.createElement(m.a,{id:r?t.Title:"",sx:{backgroundColor:p.palette.list[n%4]}},i.a.createElement(d.a,{container:!0,spacing:10,justifyContent:"center",alignItems:"center"},t.Content.map(function(e){return i.a.createElement(d.a,{xs:11},i.a.createElement(v,{title:e.Title,description:e.Description,icons:e.Icons,media:e.Media,mediaAlt:e.MediaAlt,embed:e.Embed,key:e.Title}))})))))},C=n(55),x=n(89),k=[{Title:"Trait Ranker",Content:[{Title:"Selection Screen",Description:"The users swipe cards depnding if they value the trait.",Media:"https://i.imgur.com/7G5Jwbk.gif",MediaAlt:"Swiping cards on the selction screen of Trait Ranker",Icons:[{Icon:i.a.createElement(C.a,null),Link:"https://github.com/NMaass/trait-ranker"},{Icon:i.a.createElement(x.a,null),Link:"https://nmaass.github.io/trait-ranker/#/"}]},{Title:"Wayne State University",Description:i.a.createElement("div",null,"A graduate of Wayne State University with a bachelors in Computer Science. Through Wayne, I interned at ",i.a.createElement("b",null,"PoGo"),", developing a Flutter app to make political information more accessible. My favorite classes were Human Computer Interaction, Mobile App Development, and Alogortihms. During my time there I studied"," ",i.a.createElement("b",null,"Dart"),",",i.a.createElement("b",null,"Javascript"),",",i.a.createElement("b",null,"C"),", ",i.a.createElement("b",null,"C++"),", ",i.a.createElement("b",null,"Java"),", and"," ",i.a.createElement("b",null,"Python"),". I also helped the Society of Computer Developers organize a hackathon"),Embed:i.a.createElement("iframe",{src:"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7056415530605318144",height:"100%",width:"100%",frameBorder:"0",allowFullScreen:"",title:"Embedded post"})}]},{Title:"Education",Content:[{Title:"Wayne State University",Description:i.a.createElement("div",null,"A graduate of Wayne State University with a bachelors in Computer Science. Through Wayne, I interned at ",i.a.createElement("b",null,"PoGo"),", developing a Flutter app to make political information more accessible. My favorite classes were Human Computer Interaction, Mobile App Development, and Alogortihms. During my time there I studied",i.a.createElement("b",null,"Dart"),",",i.a.createElement("b",null,"Javascript"),",",i.a.createElement("b",null,"C"),", ",i.a.createElement("b",null,"C++"),", ",i.a.createElement("b",null,"Java"),", and",i.a.createElement("b",null,"Python"),". I also helped the Society of Computer Developers organize a hackathon"),Embed:i.a.createElement("iframe",{src:"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7056415530605318144",height:"100%",width:"100%",frameborder:"0",allowfullscreen:"",title:"Embedded post"})}]},{Title:"Experience",Content:[{Title:"Grand Circus Coding Bootcamp",Description:"Feel free to reach out to me at my email:"}]},{Title:"Projects",Content:[{Title:"CalvinHacks 2020",Description:i.a.createElement("div",null,"At CalvinHacks 2020, my team and I developed a restaurant-finding web app called Find Dine Online using ",i.a.createElement("b",null,"React"),", ",i.a.createElement("b",null,"Python"),", and the ",i.a.createElement("b",null,"Google Maps API"),". Out of 40 teams, we were proud to place in the ",i.a.createElement("b",null,"finals"),"."),Embed:i.a.createElement("iframe",{src:"https://www.linkedin.com/embed/feed/update/urn:li:share:6648997759674396672",height:"100%",width:"100%",frameborder:"0",allowfullscreen:"",title:"CalvinHacks 2020"})},{Title:"Orderle",Description:i.a.createElement("div",null,"I developed a Wordle-style trivia game using ",i.a.createElement("b",null,"React"),' that challenges players to test their knowledge daily of both "if" and "in what order".'),Media:"https://i.imgur.com/ItURKaX.gifv",Icons:[{Icon:i.a.createElement(C.a,null),Link:"https://github.com/NMaass/orderle"}]},{Title:"SpartaHack 2023",Description:i.a.createElement("div",null,"Along with my team at SpartaHack 2023, I created a web app called Ingredient Investigator that used optical character recognition to scan items at the store, look up their ingredints, and warn the user of any potentially harmful substancies. This was done using"," ",i.a.createElement("b",null,"React"),", ",i.a.createElement("b",null,"Python"),", and ",i.a.createElement("b",null,"Tesseract"),"."," "),Media:"https://media.licdn.com/dms/image/C5622AQH3UxlEd5LUvQ/feedshare-shrink_1280/0/1675386323777?e=1686787200&v=beta&t=0HmhhiCm7xeQCpGuHaIU51HtHStUQhw_Zoo-bxfOpxc",Icons:[{Icon:i.a.createElement(C.a,null),Link:"https://github.com/NMaass/IngredientInvestigator"}]}]}],I=k.map(function(e){return e.Title}),S=k,T=n(106),O=n(133),j=n(134),D=n(108),A=function(e){var t=e.doScroll,n=Object(a.useContext)(R),r=n.currentSection,l=(n.setCurrentSection,Object(a.useContext)(P)),c=I.map(function(e){return i.a.createElement(O.a,{label:e,key:e,sx:{"&.Mui-selected":{backgroundColor:p.palette.list[I.indexOf(e)%4],color:"black",borderRadius:"10px"}}})});return i.a.createElement(j.a,{position:"sticky",sx:{height:"5vh"}},i.a.createElement(m.a,{sx:{borderRadius:0}},i.a.createElement(D.a,{value:I.indexOf(r),onChange:function(e,n){t(I[n])},centered:!!l,indicatorColor:p.palette.list[I.indexOf(r)%3]},c)))},M=n(1),P=Object(a.createContext)(),R=Object(a.createContext)();var F=function(){var e=Object(T.a)("(max-width: 1023px)"),t=Object(M.p)().initialSection,n=(i.a.useRef(null),i.a.useState(S[0].Title)),r=Object(c.a)(n,2),l=r[0],o=r[1],s={currentSection:l,setCurrentSection:o},u=S.map(function(t,n){return i.a.createElement("div",null,!e&&i.a.createElement("div",{style:{height:"2vh"},id:t.Title}),i.a.createElement(d.a,{key:n},i.a.createElement(y,{section:t,index:n})))});Object(a.useEffect)(function(){t&&S.forEach(function(e){e.Title===t&&m(t)})},[]);var m=function(e){e!==l&&(o(e),document.getElementById(e).scrollIntoView({behavior:"smooth"}))};return i.a.createElement("div",null,i.a.createElement(P.Provider,{value:e},i.a.createElement(R.Provider,{value:s},i.a.createElement(A,{doScroll:m}),i.a.createElement(d.a,{container:!0,direction:"column",justifyContent:"center",spacing:e?20:10},u))))},H=function(e){e&&e instanceof Function&&n.e(1).then(n.bind(null,107)).then(function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,r=t.getLCP,l=t.getTTFB;n(e),a(e),i(e),r(e),l(e)})},L=n(60);l.a.createRoot(document.getElementById("root")).render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(L.a,null,i.a.createElement(M.c,null,i.a.createElement(M.a,{path:"/:initialSection?",element:i.a.createElement(F,null)}))))),H()}},[[71,3,2]]]);
//# sourceMappingURL=main.9e92a471.chunk.js.map