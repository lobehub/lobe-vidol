uniform float f_Cutoff;
uniform vec4 v_Color;
uniform vec4 v_ShadeColor;
uniform sampler2D t_MainTex;
uniform sampler2D t_ShadeTexture;
uniform float f_BumpScale;
uniform sampler2D t_BumpMap;
uniform float f_ReceiveShadowRate;
uniform sampler2D t_ReceiveShadowTexture;
uniform float f_ShadeShift;
uniform float f_ShadeToony;
uniform float f_LightColorAttenuation;
uniform sampler2D t_SphereAdd;
uniform vec4 v_EmissionColor;
uniform sampler2D t_EmissionMap;
uniform sampler2D t_OutlineWidthTexture;
uniform float f_OutlineWidth;
uniform float f_OutlineScaledMaxDistance;
uniform vec4 v_OutlineColor;
uniform float f_OutlineLightingMix;

uniform int f_DebugMode;
uniform int f_BlendMode;
uniform int f_OutlineWidthMode;
uniform int f_OutlineColorMode;
uniform int f_CullMode; // Cull [0: Off | 1: Front | 2: Back]
uniform int f_OutlineCullMode;
uniform float f_SrcBlend; // Blend [SrcFactor] [DstFactor]
uniform float f_DstBlend; // Blend [SrcFactor] [DstFactor]
uniform int f_ZWrite; // ZWrite [On | Off]
uniform int f_IsFirstSetup;
