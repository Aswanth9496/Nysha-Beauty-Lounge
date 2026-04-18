"use client";

export default function Hero() {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-salon-bg">
            {/* Background video with zoom */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <video
                    className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.75] saturate-[1.1] animate-hero-bg-zoom"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/Hero video.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Cinematic Overlays */}
            <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,rgba(20,20,20,0.3)_0%,rgba(20,20,20,0.05)_35%,rgba(20,20,20,0.05)_60%,rgba(20,20,20,0.65)_100%),linear-gradient(to_right,rgba(20,20,20,0.4)_0%,transparent_25%,transparent_75%,rgba(20,20,20,0.4)_100%)]" />
            <div className="absolute inset-0 z-[2] pointer-events-none bg-[conic-gradient(from_220deg_at_20%_85%,transparent_0deg,rgba(201,168,76,0.07)_18deg,transparent_36deg),conic-gradient(from_60deg_at_80%_15%,transparent_0deg,rgba(201,168,76,0.05)_22deg,transparent_44deg)] animate-beam-float" />

            {/* Content */}
            <div className="relative z-[3] text-center max-w-[820px] px-8">
                <div className="inline-flex items-center gap-[14px] text-[9px] tracking-[7px] text-gold uppercase mb-[34px] opacity-0 animate-[fadeUp_0.9s_0.3s_forwards]">
                    <span className="w-[30px] h-[1px] bg-gold/50" />
                    Premium Salon &nbsp;·&nbsp; JVC &nbsp;·&nbsp; Dubai
                    <span className="w-[30px] h-[1px] bg-gold/50" />
                </div>

                <h1 className="font-playfair text-[clamp(52px,8vw,104px)] font-normal leading-[1.02] tracking-[-1px] mb-[22px] opacity-0 animate-[fadeUp_0.9s_0.6s_forwards] text-white">
                    Luxury<br /><em className="italic text-gold not-italic">Beauty</em><br />Redefined
                </h1>

                <p className="text-[11px] tracking-[8px] text-[rgba(245,240,232,0.38)] uppercase mb-[54px] opacity-0 animate-[fadeUp_0.9s_0.9s_forwards]">
                    Walk In &nbsp;&nbsp;·&nbsp;&nbsp; Glow Out
                </p>

                <div className="opacity-0 animate-[fadeUp_0.9s_1.2s_forwards]">
                    <div className="opacity-0 animate-[fadeUp_0.9s_1.2s_forwards]">
                 <a
                  href="https://www.fresha.com/a/nysha-beauty-lounge-dubai-3654-j5p-dubai-jvc-25deg0332-7-n-55deg1219-6-e-dubai-htjn822h/all-offer?menu=true&share=true&pId=2805835"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group relative overflow-hidden font-dm-sans text-[10px] font-light tracking-[4.5px] uppercase py-[17px] px-12 border border-gold text-gold bg-transparent cursor-pointer transition-colors duration-[0.35s] hover:text-[#080808] inline-flex items-center justify-center no-underline"
                 >
                   <span className="relative z-10">Book Your Appointment</span>
                   <div className="absolute inset-0 bg-gold -translate-x-[101%] transition-transform duration-[0.38s] cubic-bezier-[0.77,0,0.18,1] group-hover:translate-x-0" />
                 </a>
               </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-[34px] left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-[10px] opacity-0 animate-[fadeIn_1s_2.2s_forwards]">
                <div className="w-[1px] h-[48px] bg-gradient-to-b from-gold to-transparent animate-scroll-pulse" />
                <span className="text-[8px] tracking-[4px] text-[rgba(201,168,76,0.4)] uppercase">Scroll</span>
            </div>

            <style jsx global>{`
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes fadeUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
      `}</style>
        </section>
    );
}
