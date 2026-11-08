

const identityStages=[
 {label:'01 / SIGNAL',title:'An event becomes a change in state.',copy:'A sensor reading, an internal need or another perturbation enters a mechanism that already has a condition and a history. Select each stage to see how the cycle develops.'},
 {label:'02 / EVALUATE',title:'FARO follows a trajectory and weighs possible paths.',copy:'State evolves instead of resetting. The Homeostatic Attention Loop evaluates candidates, and selection connects that process to a specific edge and meaning.'},
 {label:'03 / ACT + FEEDBACK',title:'Selection has consequences in the next cycle.',copy:'An outcome can become a physical action or an expression. In the ESP32-S3 experiment, PWM acted on an external circuit and analog feedback returned to the local FARO route.'}
];
const identityTabs=[...document.querySelectorAll('[data-identity]')];
function showIdentity(index,focus=false){const stage=identityStages[index];identityTabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1});document.getElementById('identity-detail').setAttribute('aria-labelledby',identityTabs[index].id);document.getElementById('identity-detail-kicker').textContent=stage.label;document.getElementById('identity-detail-title').textContent=stage.title;document.getElementById('identity-detail-copy').textContent=stage.copy;if(focus)identityTabs[index].focus()}
identityTabs.forEach((tab,index)=>{tab.addEventListener('click',()=>showIdentity(index));tab.addEventListener('keydown',event=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(event.key)){event.preventDefault();showIdentity(event.key==='Home'?0:event.key==='End'?identityTabs.length-1:(index+(event.key==='ArrowRight'?1:identityTabs.length-1))%identityTabs.length,true)}})});
const journeyData=[
 {stage:'CHAPTER 01 / THE HOST',glyph:'PC',eyebrow:'RESIDENT RUNTIME',number:'6.466 <i>ms</i>',title:'First, establish a working baseline.',copy:'Benchmark 3 measures OSH on a CPU-only Intel Atom D2500. It records 30 structured inputs and a resident runtime. This is a PC result, not a microcontroller timing claim.',href:'#benchmark3',link:'Watch the PC recording and read Benchmark 3'},
 {stage:'CHAPTER 02 / THE FROZEN CORE',glyph:'C',eyebrow:'CROSS-TARGET OBJECTS',number:'21 <i>/ 22</i>',title:'The core moves beyond one processor family.',copy:'The hash-verified Tier-A substrate generated object files across x86, ARM, RISC-V, MIPS, PowerPC, SPARC, LoongArch64 and WASM32. The m68k test did not compile. This phase proves portability of compilation, not execution on all those boards.',href:'#microcontroladores',link:'Explore the Universal Substrate Benchmark'},
 {stage:'CHAPTER 03 / A DIFFERENT ISA',glyph:'R',eyebrow:'ORIGINAL GOLDEN CASES',number:'2 <i>/ 2</i>',title:'Now run the original test on virtual RISC-V.',copy:'The original SHA-256-verified Tier-A harness ran under emulated RV32IMF and passed both golden cases, with maximum absolute error ≤5×10⁻⁸. This virtual execution is distinct from the physical ESP32-S3 proof.',href:'#microcontroladores',link:'Review virtual golden parity'},
 {stage:'CHAPTER 04 / REAL SILICON',glyph:'S3',eyebrow:'FIVE-LEVEL CAUSAL PARITY',number:'150 <i>/ 150</i>',title:'The causal path reaches ESP32-S3 hardware.',copy:'Two physical units reproduced Tier-A. The physical paper documents 150/150 PC–MCU causal checks and a 100,000-cycle analog feedback loop. The ESP32-S3 main processor is Xtensa, not the RV32IMF machine used for the virtual test.',href:'#evidencia',link:'See the physical experiment and technical paper'},
 {stage:'CHAPTER 05 / PHYSICAL ARM',glyph:'ARM',eyebrow:'STRUCTURAL-PARITY TEST CASES',number:'30 <i>/ 30</i>',title:'OSH runs on a second physical processor family.',copy:'The physical STM32F446RE / ARM Cortex-M4 passed the 30-case structural-parity gate and completed 100,000 DAC-to-ADC closed-loop cycles with zero reported ADC or state failures. The October whitepaper documents external oscilloscope captures and board-level power observation. Physical RISC-V was the next milestone after this ARM test; it is now documented in the 09 October CH32V307 benchmark.',href:'#whitepaper',link:'Explore the physical ARM evidence and whitepaper'},
 {stage:'CHAPTER 06 / PHYSICAL RISC-V',glyph:'RV',eyebrow:'NATIVE PHYSICAL CLOSED-LOOP CYCLES',number:'100,000',title:'The frozen architecture reaches physical RISC-V.',copy:'On CH32V307 at 96 MHz, the native firmware passed 30/30 structural-parity cases and completed 100,000 DAC-to-ADC cycles with zero ADC failures, state failures or invalid actions. A separate, host-controlled FARO V2 versus PID experiment is reported with its own execution boundary.',href:'#riscv-physical',link:'Explore the RISC-V benchmark and physical evidence'}

];
const journeyTabs=[...document.querySelectorAll('[data-journey]')];
function showJourney(index,focus=false){const item=journeyData[index];journeyTabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1});document.getElementById('journey-display').setAttribute('aria-labelledby',journeyTabs[index].id);document.getElementById('journey-display-stage').textContent=item.stage;document.getElementById('journey-glyph-center').textContent=item.glyph;document.getElementById('journey-display-eyebrow').textContent=item.eyebrow;document.getElementById('journey-display-number').innerHTML=item.number;document.getElementById('journey-display-title').textContent=item.title;document.getElementById('journey-display-copy').textContent=item.copy;const link=document.getElementById('journey-display-link');link.href=item.href;link.firstChild.textContent=item.link+' ';if(focus)journeyTabs[index].focus()}
journeyTabs.forEach((tab,index)=>{tab.addEventListener('click',()=>showJourney(index));tab.addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();showJourney(e.key==='Home'?0:e.key==='End'?journeyTabs.length-1:(index+(['ArrowRight','ArrowDown'].includes(e.key)?1:journeyTabs.length-1))%journeyTabs.length,true)}})});
const portfolioData=[
 {index:'01 / INDUSTRIAL EQUIPMENT',title:'A machine facing changing conditions.',copy:'An equipment maker could evaluate FARO as a resident supervisory path that tracks internal condition and selects an action as sensor conditions evolve. A pilot would compare its decisions against the existing process and measure the effect on operations.',buyer:'Equipment OEM or plant operator',value:'A differentiated, locally acting product and a measurable operational outcome.',revenue:'Paid pilot → board integration → per-unit license or supervised-node agreement.',wire:'M300 211 C209 208 185 108 106 87'},
 {index:'02 / ROBOTICS',title:'A robot with changing loads and surroundings.',copy:'A robotics company could test FARO as an additional stateful decision layer alongside its established motor controllers and safety systems. The acceptance test would focus on a particular sensor-to-action task.',buyer:'Robot manufacturer or automation integrator',value:'An adaptable, on-device capability for a defined operational scenario.',revenue:'Development contract → integrated runtime license → product-line expansion.',wire:'M300 211 C443 214 452 99 520 95'},
 {index:'03 / REMOTE IOT',title:'Local decisions when a connection is unavailable.',copy:'A remote-device maker could put the validated local route close to sensors and actuators. An application-specific pilot would determine which decisions can stay on-device while telemetry and management remain optional network services.',buyer:'IoT device maker or fleet operator',value:'Continuity of the local function and fewer remote decision calls when applicable.',revenue:'Reference integration → device licensing → deployment and support.',wire:'M300 211 C221 249 183 356 112 363'},
 {index:'04 / OEM PLATFORMS',title:'An architecture carried into new hardware.',copy:'A chip or board partner could work with OSH Global Systems on a target-specific build, physical validation and developer reference package. The universal benchmark makes this a concrete engineering path, not an automatic claim of silicon support.',buyer:'Semiconductor company or hardware OEM',value:'A differentiated developer offering and another category of device design.',revenue:'Co-development agreement → platform license → partner ecosystem.',wire:'M300 211 C390 252 417 358 508 360'}
];
const portfolioTabs=[...document.querySelectorAll('[data-market]')];
function showPortfolio(index,focus=false){const item=portfolioData[index];portfolioTabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1});document.getElementById('portfolio-detail').setAttribute('aria-labelledby',portfolioTabs[index].id);for(const [id,val] of Object.entries({'portfolio-detail-index':item.index,'portfolio-detail-title':item.title,'portfolio-detail-copy':item.copy,'portfolio-detail-buyer':item.buyer,'portfolio-detail-value':item.value,'portfolio-detail-revenue':item.revenue}))document.getElementById(id).textContent=val;document.getElementById('portfolio-wire').setAttribute('d',item.wire);if(focus)portfolioTabs[index].focus()}
portfolioTabs.forEach((tab,index)=>{tab.addEventListener('click',()=>showPortfolio(index));tab.addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();showPortfolio(e.key==='Home'?0:e.key==='End'?portfolioTabs.length-1:(index+(['ArrowRight','ArrowDown'].includes(e.key)?1:portfolioTabs.length-1))%portfolioTabs.length,true)}})});



const stages=[
 {label:'STAGE 01 / INPUT',title:'Perturbation',desc:'A signal from the environment or system perturbs persistent state. In the physical experiment, an analog reference enters through GPIO3 and feedback returns through GPIO2.',proof:'EVIDENCE: ADC → OSH → PWM/RC → ADC LOOP'},
 {label:'STAGE 02 / CORE',title:'Endogenous state',desc:'The public boundary exposes C/P/X/T/H coordinates. The mechanism preserves an internal condition across cycles and regulates its evolution; update rules and coefficients remain protected.',proof:'EVIDENCE: 30/30 STATE PARITY IN STEP19'},
 {label:'STAGE 03 / DYNAMICS',title:'Trajectory and vortex',desc:'The path preserves its trajectory as well as settled state. Step19 separately compares the dynamic path and final state to expose divergences that a similar output might conceal.',proof:'EVIDENCE: 30/30 TRAJECTORY PARITY'},
 {label:'STAGE 04 / ATTENTION',title:'Homeostatic Attention Loop',desc:'HAL evaluates candidate transitions against the endogenous condition. Its boundary was tested as a distinct causal level before selection was checked.',proof:'EVIDENCE: 30/30 HAL CANDIDATE PARITY'},
 {label:'STAGE 05 / ACTION',title:'Selection and meaning',desc:'The selector preserves the chosen edge ID in a compact semantic structure; meaning or action follows from that selection. Text and speech generation remain downstream.',proof:'EVIDENCE: 30/30 EDGE IDs + 30/30 MEANING'}
];
const stageButtons=[...document.querySelectorAll('[data-stage]')];
function selectStage(n,focus=false){const x=stages[n];stageButtons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===n));b.tabIndex=i===n?0:-1});document.getElementById('mechanism-detail').setAttribute('aria-labelledby',stageButtons[n].id);document.getElementById('stage-label').textContent=x.label;document.getElementById('stage-title').textContent=x.title;document.getElementById('stage-desc').textContent=x.desc;document.getElementById('stage-proof').textContent=x.proof;document.querySelectorAll('#diagram-nodes circle').forEach((c,i)=>c.setAttribute('fill',i===n?'#7be8fa':'#0b2135'));document.getElementById('signal-ring').style.transform='translateX('+[0,96,193,290,388][n]+'px)';if(focus)stageButtons[n].focus()}
stageButtons.forEach((b,i)=>{b.addEventListener('click',()=>selectStage(i));b.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'||e.key==='Home'||e.key==='End'){e.preventDefault();selectStage(e.key==='Home'?0:e.key==='End'?4:(i+(e.key==='ArrowRight'?1:4))%5,true)}})});
selectStage(0);
const evButtons=[...document.querySelectorAll('.evidence-rail button')];evButtons.forEach((b,i)=>{b.addEventListener('click',()=>showEvidence(i));b.addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();let n=e.key==='Home'?0:e.key==='End'?evButtons.length-1:(i+(['ArrowRight','ArrowDown'].includes(e.key)?1:evButtons.length-1))%evButtons.length;showEvidence(n);evButtons[n].focus()}})});function showEvidence(n){evButtons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===n));b.tabIndex=i===n?0:-1;document.getElementById(b.getAttribute('aria-controls')).hidden=i!==n})}showEvidence(0);
const substrateDetails=[
 {label:'EVIDENCE 01 / CROSS-TARGET COMPILATION',title:'One frozen core. Multiple target profiles.',copy:'The original SHA-256-verified Tier-A core and header generated objects for 21 of 22 profiles across x86, ARM, RISC-V, MIPS, PowerPC, SPARC, LoongArch64 and WASM32. The tested m68k profile failed; object generation alone does not prove physical execution on those targets.',readout:'COMPILE PASS',value:'21 / 22',foot:'m68k / NOT PASSED'},
 {label:'EVIDENCE 02 / ORIGINAL HARNESS EXECUTION',title:'The same golden cases ran on a different ISA.',copy:'The original, hash-verified Tier-A harness executed on RV32IMF under QEMU, with CORE_CHANGED=false, HEADER_CHANGED=false and HARNESS_CHANGED=false. OSH_PRESENCE and OSH_NO_ACTIVATION both passed; maximum absolute error was ≤5×10⁻⁸ against the original 10⁻⁶ acceptance threshold. Top-K order was preserved.',readout:'VIRTUAL GOLDEN PARITY',value:'2 / 2',foot:'RV32IMF / QEMU · ≤5×10⁻⁸'},
 {label:'EVIDENCE 03 / PHYSICAL VALIDATION',title:'Then the tested OSH route ran on real silicon.',copy:'ESP32-S3 results reported by OSH Global Systems reproduce Tier-A on two physical units, pass candidate scaling through 1024 and validate Tier-B1 HAL while Tier-A remains PASS. The physical paper extends this to 150/150 PC–MCU causal checks and a 100,000-cycle analog closed loop. These are physical measurements, not timing inferred from QEMU.',readout:'SILICON REPRODUCTION',value:'2 units',foot:'ESP32-S3 / VERIFIED ROUTE'}
];
const substrateTabs=[...document.querySelectorAll('[data-substrate]')];
function showSubstrate(index,focus=false){const item=substrateDetails[index];substrateTabs.forEach((button,i)=>{button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1});document.getElementById('substrate-panel').setAttribute('aria-labelledby',substrateTabs[index].id);for(const [id,value] of Object.entries({'substrate-detail-label':item.label,'substrate-detail-title':item.title,'substrate-detail-copy':item.copy,'substrate-readout-label':item.readout,'substrate-readout-value':item.value,'substrate-readout-foot':item.foot}))document.getElementById(id).textContent=value;if(focus)substrateTabs[index].focus()}
substrateTabs.forEach((button,index)=>{button.addEventListener('click',()=>showSubstrate(index));button.addEventListener('keydown',event=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(event.key)){event.preventDefault();showSubstrate(event.key==='Home'?0:event.key==='End'?substrateTabs.length-1:(index+(event.key==='ArrowRight'?1:substrateTabs.length-1))%substrateTabs.length,true)}})});

const box=document.getElementById('lightbox');document.querySelectorAll('.zoom').forEach(b=>b.addEventListener('click',()=>{document.getElementById('lightbox-image').src=b.dataset.photo;document.getElementById('lightbox-image').alt=b.dataset.caption;document.getElementById('lightbox-caption').textContent=b.dataset.caption;box.showModal()}));document.getElementById('lightbox-close').addEventListener('click',()=>box.close());box.addEventListener('click',e=>{if(e.target===box)box.close()});
const contactForm=document.getElementById('contact-form');contactForm.addEventListener('submit',e=>{e.preventDefault();if(!contactForm.reportValidity())return;const data=new FormData(contactForm);const val=k=>String(data.get(k)||'').trim();const subject='OSH — Inquiry about '+val('interest');const body=['Name: '+val('name'),'Company: '+val('company'),'Email: '+val('email'),'Interest: '+val('interest'),'','Project:',val('message')].join('\n');document.getElementById('form-status').textContent='Your email application will open so you can review the draft.';window.location.href='mailto:fabian.vallejos@oshsystems.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body)});
contactForm.querySelector('button[type="submit"]').disabled=false;


(function(){
 const video=document.getElementById('benchmark-video');
 const play=document.getElementById('benchmark-play');
 const error=document.getElementById('film-error');
 let attemptedFallback=false;
 const fallback='https://raw.githubusercontent.com/vallejosjose964-dot/oshsystems-web/main/demo.mp4';
 if(location.protocol==='file:'){attemptedFallback=true;video.src=fallback;video.load()}
 document.querySelectorAll('[data-seek]').forEach(button=>button.addEventListener('click',()=>{const seek=()=>{video.currentTime=Number(button.dataset.seek);video.play().catch(()=>{error.hidden=false})};if(video.readyState>=1)seek();else video.addEventListener('loadedmetadata',seek,{once:true})}));
 play.addEventListener('click',()=>video.play().catch(()=>{error.hidden=false}));
 video.addEventListener('play',()=>{play.hidden=true;error.hidden=true});
 video.addEventListener('pause',()=>{play.hidden=false});
 video.addEventListener('ended',()=>{play.hidden=false});
 video.addEventListener('error',()=>{
   if(!attemptedFallback){attemptedFallback=true;video.src=fallback;video.load();return}
   error.hidden=false;
 });
})();


document.querySelectorAll('[data-commercial-interest]').forEach(link=>{
 link.addEventListener('click',()=>{
  const field=document.querySelector('#contact-form select[name="interest"]');
  const value=link.dataset.commercialInterest;
  if(field&&[...field.options].some(option=>option.value===value)){
   field.value=value;
   field.dispatchEvent(new Event('change',{bubbles:true}));
  }
 });
});

(()=>{
  document.querySelectorAll('.rv26-zoom').forEach(button=>button.addEventListener('click',()=>{
    const box=document.getElementById('lightbox');
    const target=document.getElementById('lightbox-image');
    const caption=document.getElementById('lightbox-caption');
    const img=button.querySelector('img');
    if(!box||!target||!caption)return;
    target.src=img.currentSrc||img.src;target.alt=img.alt;
    caption.textContent=button.closest('figure').querySelector('figcaption').textContent;
    if(!box.open)box.showModal();
  }));
  document.querySelectorAll('.zoom[data-photo="./osh_power_observation_20260930.jpg"]').forEach(button=>button.addEventListener('click',()=>{
    const img=button.querySelector('img');
    document.getElementById('lightbox-image').src=img.dataset.fallback||img.currentSrc;
  }));
})();