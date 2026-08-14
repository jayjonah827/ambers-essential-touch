import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const ROOT = "/Users/jayjonah/.codex/.chatgpt-projects/g-p-693cb0b75f5881918497db5096508c10";
const OUT = path.join(ROOT, "outputs/amber_campaign_presentation");
const W = 1280, H = 720;
const C = { black:"111111", white:"F7F5F0", gray:"A7A7A7", dark:"202020", red:"FF3344", blue:"2F7BFF", yellow:"FFD31A", green:"48D597" };
const FONT = "Helvetica Neue";
const imgs = {
  teen: path.join(ROOT, "outputs/amber_campaign_ads/yearbook-teen-portrait-v1.png"),
  bikini: "/Users/jayjonah/.codex/generated_images/01a00088-21e7-7fb0-8e27-a3f2bbd6d6a4/exec-1b69d63b-1a0f-4eae-ba0e-01d433fa2431.png",
  executive: "/Users/jayjonah/.codex/generated_images/01a00088-367a-71a1-8559-b1ebdb918b44/exec-51158409-eb47-40b9-b431-cf9a05340161.png",
  mature: "/Users/jayjonah/.codex/generated_images/01a0003a-e94e-7623-81bd-5b7604239331/exec-b0126f82-968a-4e1e-84b0-3d6d8201d49f.png",
};

async function bytes(p){ return new Uint8Array(await fs.readFile(p)); }
function rect(slide,x,y,w,h,fill=C.black,line="none",lw=0){ return slide.shapes.add({geometry:"rect",position:{left:x,top:y,width:w,height:h},fill:{type:"solid",color:fill},line:{style:"solid",fill:line,width:lw}}); }
function line(slide,x,y,w,color=C.gray,h=1){ return rect(slide,x,y,w,h,color); }
function text(slide,s,x,y,w,h,size=22,color=C.white,bold=false,align="left"){
  const t=slide.shapes.add({geometry:"textbox",position:{left:x,top:y,width:w,height:h},fill:"none",line:{style:"solid",fill:"none",width:0}});
  t.text=s; t.text.style={fontFamily:FONT,fontSize:size,color,bold,alignment:align,verticalAlignment:"middle",wrap:true}; return t;
}
function base(slide,section,num){ slide.background.fill=C.black; text(slide,"AMBER'S ESSENTIAL TOUCH",50,22,500,24,14,C.white,true); text(slide,section.toUpperCase(),900,22,270,24,12,C.gray,true,"right"); line(slide,50,55,1180,C.dark,1); text(slide,String(num).padStart(2,"0"),1190,675,40,20,12,C.gray,true,"right"); }
function title(slide,eyebrow,headline,sub="") { text(slide,eyebrow.toUpperCase(),50,78,1130,24,14,C.red,true); text(slide,headline,50,110,1130,92,46,C.white,true); if(sub) text(slide,sub,50,202,1100,48,20,C.gray,false); }
function notes(slide,arr){ slide.speakerNotes.textFrame.setText("[Sources]\n"+arr.map(x=>`- ${x}`).join("\n")); }
function metric(slide,x,y,value,label,color=C.white){ text(slide,value,x,y,235,58,40,color,true); line(slide,x,y+62,210,color,3); text(slide,label,x,y+73,220,42,14,C.gray,true); }
function posterText(slide,headline,sub,cta,accent){ rect(slide,50,488,690,172,C.black); line(slide,50,488,690,accent,4); text(slide,headline,75,505,640,68,26,C.white,true); text(slide,sub,75,575,640,24,15,accent,true); rect(slide,75,618,310,32,accent); text(slide,cta,83,618,294,32,13,C.black,true,"center"); }

async function main(){
  await fs.mkdir(OUT,{recursive:true});
  const p=Presentation.create({slideSize:{width:W,height:H}});

  { const s=p.slides.add(); s.background.fill=C.black;
    rect(s,0,0,26,H,C.red); rect(s,26,0,12,H,C.blue);
    text(s,"AMBER'S\nESSENTIAL TOUCH",74,65,900,138,58,C.white,true);
    text(s,"AUDIENCE EXPANSION CAMPAIGN",75,248,780,40,26,C.red,true);
    text(s,"PINole + EAST BAY  /  2026",75,300,600,32,18,C.gray,true);
    line(s,75,402,1080,C.dark,2);
    text(s,"CONTENT THAT EARNS ATTENTION.\nEXPERTISE THAT EARNS THE APPOINTMENT.",75,430,1020,110,35,C.white,true);
    text(s,"STRATEGY • REAL ADS • MARKET VISUALIZATION • PRODUCTION SYSTEM",75,635,1000,28,14,C.blue,true);
    notes(s,["User-provided Amber's Essential Touch campaign brief, 2026-08-14."]); }

  { const s=p.slides.add(); base(s,"Campaign hierarchy",2); title(s,"The main goal","Turn local expertise into an expanding audience—and that audience into recurring value.");
    const items=[["01","AUDIENCE"],["02","ATTENTION"],["03","TRUST"],["04","LOCAL DEMAND"],["05","FIRST VISIT"],["06","RECURRING VALUE"],["07","PRODUCT + BRAND"]];
    items.forEach((it,i)=>{const x=50+i*170; text(s,it[0],x,305,55,28,14,i<3?C.red:C.blue,true); line(s,x,340,140,i<3?C.red:C.blue,3); text(s,it[1],x,360,140,58,19,C.white,true); if(i<6) text(s,"→",x+142,350,28,40,24,C.gray,true,"center");});
    text(s,"Inclusion is preserved across the portfolio—not compressed into every post.",50,536,1120,44,27,C.white,true);
    text(s,"Situations, conflicts and comment triggers are executions underneath this accumulation hierarchy.",50,590,1100,36,18,C.gray,false);
    notes(s,["AMBER_ESSENTIAL_TOUCH_SOURCE_BACKED_CAMPAIGN_BRIEFS.md, Main Goal and Campaign Accumulation Hierarchy."]); }

  { const s=p.slides.add(); base(s,"Regional opportunity",3); title(s,"Pinole market foundation","A mature, high-income, culturally mixed local base with meaningful multilingual reach.");
    metric(s,50,302,"18,761","POPULATION",C.white); metric(s,335,302,"$127,717","MEDIAN HOUSEHOLD INCOME",C.green); metric(s,620,302,"44.7","MEDIAN AGE",C.yellow); metric(s,905,302,"41.2%","LANGUAGE OTHER THAN ENGLISH AT HOME",C.blue);
    text(s,"Implication",50,515,180,24,14,C.red,true); text(s,"Build for more than one life stage and more than one cultural beauty norm—then distribute those perspectives across enough posts to remain specific.",220,500,950,80,26,C.white,true);
    notes(s,["Census Reporter, Pinole city, California profile: https://censusreporter.org/profiles/16000US0657288-pinole-ca/","U.S. Census Bureau QuickFacts, Pinole city, California: https://www.census.gov/quickfacts/fact/table/pinolecitycalifornia/HSG495224"]); }

  { const s=p.slides.add(); base(s,"Age targets",4); title(s,"Three age groups—not one generic beauty audience.","Regional age composition informs media weight; campaign targets remain Teens 16–19, Adults 20s–30s, Mature 40s–50+.");
    const rows=[["UNDER 18","17.9",17.9,C.yellow,"TEENS 16–19"],["18–64","60.0",60,C.red,"ADULTS 20s–30s"],["65+","21.4",21.4,C.blue,"MATURE 40s–50+"]];
    rows.forEach((r,i)=>{const y=302+i*105; text(s,r[0],50,y,140,34,18,C.white,true); rect(s,200,y+3,800,30,C.dark); rect(s,200,y+3,800*r[2]/70,30,r[3]); text(s,r[1]+"%",1020,y,90,34,22,r[3],true); text(s,r[4],1110,y,120,34,13,C.gray,true,"right");});
    text(s,"MEN",50,628,90,24,14,C.blue,true); text(s,"Cross-cutting creative within all three age groups—not a fourth age category.",140,624,940,32,19,C.white,true);
    notes(s,["U.S. Census Bureau QuickFacts, Pinole city, California: https://www.census.gov/quickfacts/fact/table/pinolecitycalifornia/HSG495224","User-provided campaign brief, Three Age-Group Targets."]); }

  { const s=p.slides.add(); base(s,"Cultural audience",5); title(s,"Geography shapes the creative lanes.","Approximate local shares show why audience specificity must be accumulated across the campaign.");
    const rows=[["WHITE",31,C.white],["HISPANIC / LATINO",29,C.red],["ASIAN",28,C.yellow],["BLACK",10,C.blue]];
    rows.forEach((r,i)=>{const y=284+i*82;text(s,r[0],50,y,220,34,18,C.white,true); rect(s,285,y+4,750,25,C.dark);rect(s,285,y+4,750*r[1]/35,25,r[2]);text(s,r[1]+"%",1060,y,70,34,22,r[2],true);});
    text(s,"CREATIVE LANES",50,625,170,22,13,C.gray,true); text(s,"African / Black diaspora  •  Latin American / Caribbean  •  East, Southeast + South Asian  •  European / Mediterranean / MENA",220,614,950,46,17,C.white,true);
    notes(s,["User-provided campaign brief, Pinole demographic composition; approximate shares and source labels preserved.","U.S. Census Bureau QuickFacts, Pinole city, California: https://www.census.gov/quickfacts/fact/table/pinolecitycalifornia/HSG495224"]); }

  { const s=p.slides.add(); base(s,"Inclusion through quantity",6); text(s,"TWELVE AUDIENCE CELLS. ONE ACCUMULATED BRAND.",50,72,1130,24,14,C.red,true); text(s,"Each asset can be sharp, culturally specific and\nconversion-minded because the portfolio carries\nthe diversity.",50,108,1130,136,40,C.white,true);
    const cols=["BLACK DIASPORA","LATIN / CARIBBEAN","ASIAN REGIONS","MED / MENA / EUROPE"]; const rows=["TEENS 16–19","ADULTS 20s–30s","MATURE 40s–50+"];
    cols.forEach((c,i)=>text(s,c,245+i*235,260,205,35,13,[C.blue,C.red,C.yellow,C.white][i],true,"center"));
    rows.forEach((r,j)=>{text(s,r,50,324+j*94,170,60,17,C.white,true); cols.forEach((c,i)=>{rect(s,245+i*235,314+j*94,205,70,C.dark,[C.blue,C.red,C.yellow,C.white][i],2);text(s,["Texture + confidence","Ritual + visibility","Technique + care","Maintenance + health"][i],258+i*235,326+j*94,179,42,14,C.white,true,"center");});});
    text(s,"MEN APPEAR INSIDE EACH ROW WHERE THE SERVICE, skin concern and cultural context are real.",50,624,1100,30,17,C.blue,true);
    notes(s,["AMBER_ESSENTIAL_TOUCH_SOURCE_BACKED_CAMPAIGN_BRIEFS.md, Geographic Skin-Type Audience System and Inclusion Through Quantity Matrix."]); }

  { const s=p.slides.add(); base(s,"Offer economics",7); title(s,"Content has a job at every stage.","The first creative earns the pause. The system earns the repeat visit.");
    const stages=[["01","STOP","3-SECOND HOOK"],["02","ENGAGE","LIKE • COMMENT • SHARE"],["03","CONSIDER","DM • PROFILE • OFFER"],["04","CONVERT","FIRST APPOINTMENT"],["05","RETAIN","MEMBERSHIP • PRODUCT"]];
    stages.forEach((a,i)=>{const x=50+i*235; text(s,a[0],x,275,45,22,13,i<2?C.red:C.blue,true); line(s,x,305,200,i<2?C.red:C.blue,3); text(s,a[1],x,320,200,34,24,C.white,true); text(s,a[2],x,360,200,42,13,C.gray,true);});
    line(s,50,445,1180,C.dark,2); metric(s,50,475,"$150","STATED GLASS SKIN VALUE",C.white); metric(s,335,475,"$69","FIRST-TIME PRICE",C.red); metric(s,620,475,"$30","ILLUSTRATIVE COST / CUSTOMER",C.yellow); metric(s,905,475,"$120/mo","ILLUSTRATIVE MEMBERSHIP",C.blue);
    text(s,"MODEL INPUT",50,650,110,18,11,C.gray,true); text(s,"40% illustrative conversion—not measured campaign performance.",165,646,710,26,14,C.white,true);
    notes(s,["User-provided campaign brief, Offer Economics; all dollar and conversion figures are campaign model inputs, not measured results."]); }

  const adSlides=[
    ["TEENS 16–19","YEARBOOK CONFIDENCE",imgs.teen,"MOST LIKELY TO STOP\nHIDING FROM FLASH.","THE YEARBOOK / CONFIDENCE + BACK-TO-SCHOOL","CLEAR SKIN INTAKE / PINOLE",C.yellow,"Portrait proof + identity language","Stop: recognizable school ritual","Engage: tag or share with a friend","Convert: clear-skin intake"],
    ["ADULTS 20s–30s","YELLOW POLKA DOT BIKINI",imgs.bikini,"THE POOL PARTY IS\nIN 6 HOURS.","THROW AWAY THE RAZOR.","BOOK AMBER / EAST BAY WAXING",C.yellow,"Urgency without generic beauty copy","Stop: iconic color + time pressure","Engage: razor-versus-wax debate","Convert: appointment-ready CTA"],
    ["MEN / ADULT CROSS-CUT","EXECUTIVE RESET",imgs.executive,"YOUR BARBER CANNOT FIX WHAT\nTHE RAZOR KEEPS PUTTING BACK.","EXECUTIVE RESET","MONTHLY MAINTENANCE / PINOLE",C.blue,"Health-specific maintenance positioning","Stop: direct contradiction","Engage: grooming norm discussion","Convert: recurring maintenance"],
    ["MATURE 40s–50+","RE-ESTABLISH THE PRIME",imgs.mature,"RE-ESTABLISH\nTHE PRIME.","THE ROOM DIDN'T CHANGE. HER RITUAL DID.","BLUEPRINT CONSULTATION",C.red,"Presence, ritual and re-entry","Stop: elegant emotional reversal","Engage: confidence story","Convert: consultation"],
  ];
  let n=8;
  for(const a of adSlides){ const s=p.slides.add(); base(s,"Real ad / "+a[0],n++); text(s,a[1],790,86,420,34,16,a[6],true); text(s,a[3],800,130,410,130,29,C.white,true); line(s,790,275,390,a[6],4); text(s,a[7],800,305,390,55,20,C.white,true); text(s,"— "+a[8].replace(/^Stop:\s*/,""),800,395,390,30,15,C.gray,true); text(s,"— "+a[9].replace(/^Engage:\s*/,""),800,445,390,30,15,C.gray,true); text(s,"— "+a[10].replace(/^Convert:\s*/,""),800,495,390,30,15,C.gray,true); text(s,"3-SECOND AUDIT",800,585,180,22,12,a[6],true); text(s,"Readable face • one tension • one action",800,612,390,32,17,C.white,true);
    s.images.add({blob:await bytes(a[2]),contentType:"image/png",alt:a[1]+" campaign visual",fit:"cover",position:{left:50,top:82,width:690,height:406},geometry:"rect"}); posterText(s,a[3],a[4],a[5],a[6]);
    notes(s,["OpenAI ImageGen, generated specifically for Amber's Essential Touch campaign, 2026-08-14.","User-provided campaign brief and AMBER_ESSENTIAL_TOUCH_SOURCE_BACKED_CAMPAIGN_BRIEFS.md."]); }

  { const s=p.slides.add(); base(s,"Content system",12); title(s,"Five content pillars distribute the campaign's intelligence.","The audience grid decides who. The pillar decides what the post does.");
    const pp=[["01","IDENTITY + CONFIDENCE",C.red],["02","SKIN + HAIR EDUCATION",C.blue],["03","SERVICE PROOF",C.yellow],["04","COMMUNITY ENGAGEMENT",C.white],["05","OFFER + RETENTION",C.green]];
    pp.forEach((r,i)=>{const x=50+i*235; text(s,r[0],x,280,40,22,13,r[2],true); line(s,x,312,200,r[2],4); text(s,r[1],x,330,200,72,22,C.white,true);});
    text(s,"WEEKLY ACCUMULATION",50,492,220,22,14,C.gray,true); text(s,"4 audience-specific posts  +  2 education/proof posts  +  1 offer post",50,525,1130,48,29,C.white,true);
    text(s,"The result is diversity in quantity, not diluted representation inside every execution.",50,607,1100,36,20,C.red,true);
    notes(s,["AMBER_ESSENTIAL_TOUCH_SOURCE_BACKED_CAMPAIGN_BRIEFS.md, Content Pillars and Production Accumulation Order."]); }

  { const s=p.slides.add(); base(s,"Production engine",13); title(s,"A repeatable engine—not four isolated ads.","Create specificity at volume, learn from reaction, and amplify what earns attention.");
    const stages=[["CAPTURE","Client B-roll\ntexture • ritual • result"],["BATCH","3-second hooks\nmultiple audience cells"],["TEST","Organic posts\ncomments • shares • saves"],["AMPLIFY","Paid support\nfor proven winners"],["RETAIN","Membership\nproducts • referrals"]];
    stages.forEach((a,i)=>{const x=50+i*235; rect(s,x,285,200,200,C.dark,i%2?C.blue:C.red,2); text(s,String(i+1).padStart(2,"0"),x+18,300,40,24,13,i%2?C.blue:C.red,true); text(s,a[0],x+18,340,165,32,23,C.white,true); text(s,a[1],x+18,390,165,70,16,C.gray,false); if(i<4) text(s,"→",x+203,365,30,40,24,C.white,true,"center");});
    text(s,"FIRST PRODUCTION WAVE",50,535,220,20,13,C.yellow,true); text(s,"Yearbook • Bikini urgency • Executive maintenance • Mature ritual • Group chat • DMs • Dating • Health education",50,565,1130,68,23,C.white,true);
    notes(s,["Meta Reels ads guidance: https://www.facebook.com/business/ads/facebook-instagram-reels-ads","TikTok SMB Beauty Playbook: https://ads.tiktok.com/business/library/English_SMB_Beauty_META_Playbook_English_Final.pdf","AMBER_ESSENTIAL_TOUCH_SOURCE_BACKED_CAMPAIGN_BRIEFS.md, Production Accumulation Order."]); }

  { const s=p.slides.add(); base(s,"Measurement + next wave",14); title(s,"Measure expansion before optimizing only for purchase.","The campaign has to grow the reachable audience while proving which specific promises create demand.");
    const m=[["ATTENTION","3-sec hold\nthumb-stop rate",C.red],["ENGAGEMENT","Shares\ncomments • saves",C.yellow],["AUDIENCE","Profile visits\nfollows",C.blue],["DEMAND","DMs\nbookings",C.green],["VALUE","Repeat visits\nmembership",C.white]];
    m.forEach((a,i)=>{const x=50+i*235; text(s,a[0],x,275,200,30,15,a[2],true); line(s,x,314,200,a[2],4); text(s,a[1],x,340,200,76,22,C.white,true);});
    text(s,"NEXT CREATIVE WAVE",50,493,260,24,14,C.gray,true); text(s,"GROUP CHAT  /  DMs  /  DATING PROFILE  /  SUBURBAN LAWN  /  EDUCATIONAL MICRO-STORIES",50,532,1150,54,25,C.white,true);
    rect(s,50,622,1130,4,C.red); text(s,"BUILD AUDIENCE  →  LEARN DEMAND  →  EXPAND THE BRAND",50,642,1130,34,23,C.white,true);
    notes(s,["AMBER_ESSENTIAL_TOUCH_SOURCE_BACKED_CAMPAIGN_BRIEFS.md, Measurement and Final Standard.","Meta tailored campaign guidance: https://www.facebook.com/business/ads/automation/tailored-campaigns"]); }

  for(const [i,s] of p.slides.items.entries()){
    const stem=`slide-${String(i+1).padStart(2,"0")}`;
    const png=await p.export({slide:s,format:"png",scale:1}); await fs.writeFile(path.join(OUT,stem+".png"),new Uint8Array(await png.arrayBuffer()));
    const layout=await s.export({format:"layout"}); await fs.writeFile(path.join(OUT,stem+".layout.json"),await layout.text());
  }
  const montage=await p.export({format:"webp",montage:true,scale:0.5}); await fs.writeFile(path.join(OUT,"deck-montage.webp"),new Uint8Array(await montage.arrayBuffer()));
  const pptx=await PresentationFile.exportPptx(p); await pptx.save(path.join(OUT,"Amber_Essential_Touch_Audience_Expansion_Campaign.pptx"));
}
main().catch(e=>{console.error(e);process.exitCode=1;});
