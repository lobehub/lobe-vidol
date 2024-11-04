varying vec3 vViewPosition;

#ifndef FLAT_SHADED

  varying vec3 vNormal;

#endif

struct BlinnPhongMaterial {

  vec3 diffuseColor;
  vec3 specularColor;
  float specularShininess;
  float specularStrength;

};

void RE_Direct_BlinnPhong(const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight) {

  float dotNL = saturate(dot(geometry.normal, directLight.direction));
  dotNL = saturate(smoothstep(f_ShadeShift, f_ShadeShift + (1.0 + f_ShadeToony), dotNL));
  vec3 irradiance = mix(v_ShadeColor.rgb, vec3(1.0), dotNL);

  irradiance = irradiance * mix(directLight.color, vec3(average(directLight.color)), f_LightColorAttenuation);

  #ifndef PHYSICALLY_CORRECT_LIGHTS

    irradiance *= PI;

  #endif

  reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert(material.diffuseColor);
  reflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong(directLight, geometry, material.specularColor, material.specularShininess) * material.specularStrength;

}

void RE_IndirectDiffuse_BlinnPhong(const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight) {

  reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert(material.diffuseColor);

}

#define RE_Direct RE_Direct_BlinnPhong
#define RE_IndirectDiffuse RE_IndirectDiffuse_BlinnPhong

#define Material_LightProbeLOD(material) (0)
