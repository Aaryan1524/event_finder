import React from 'react';

// This is the specific SVG filter that creates the "wobbly" refraction
const LiquidFilter = () => (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
            <feTurbulence type="fractalNoise" baseFrequency="0.070 0.070" numOctaves="1" seed="5" result="turbulence" />
            <feComponentTransfer in="turbulence" result="mapped">
                <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            </feComponentTransfer>
            <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
            <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100" lightingColor="white" result="specLight">
                <fePointLight x="-200" y="-200" z="300" />
            </feSpecularLighting>
            <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
            <feDisplacementMap in="SourceGraphic" in2="softMap" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>
    </svg>
);

interface LiquidGlassProps {
    children: React.ReactNode;
    className?: string;
}

export function LiquidGlass({ children, className = '' }: LiquidGlassProps) {
    return (
        <>
            <LiquidFilter /> {/* Loads the filter definition hiddenly */}

            <div className={`relative overflow-hidden ${className}`}>
                {/* 1. The Refraction Layer (The "Liquid") */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ backdropFilter: 'blur(6px)' }}
                />

                {/* 2. The Shine/Gloss Layer (The "Glass" Surface) */}
                <div className="absolute inset-0 z-10 pointer-events-none rounded-3xl shadow-[inset_2px_2px_1px_rgba(255,255,255,0.5),inset_-1px_-1px_1px_rgba(255,255,255,0.5)] bg-white/5" />

                {/* 3. The Content */}
                <div className="relative z-20 h-full">
                    {children}
                </div>
            </div>
        </>
    );
}
