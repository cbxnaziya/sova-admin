// import React, { useState } from "react";

// interface SocialIcon {
//   name: string;
//   url: string;
//   icon: string | null;
// }


// export default function HeaderTop() {
//   const [socialIcons, setSocialIcons] = useState<SocialIcon[]>([
//     { name: "Facebook", url: "", icon: null },
//   ]);

//   const [selectedLanguage, setSelectedLanguage] = useState<string>("English");

//   const handleSocialChange = (index: number, field: keyof SocialIcon, value: string) => {
//     const updatedIcons = [...socialIcons];

//     if (field === "url") {
//       // Extract social media platform name from URL
//       const platformNames: { [key: string]: string } = {
//         facebook: "Facebook",
//         twitter: "Twitter",
//         instagram: "Instagram",
//         linkedin: "LinkedIn",
//         youtube: "YouTube",
//       };

//       let newName = updatedIcons[index].name; // Default to existing name

//       // Check if the URL contains any known platform names
//       Object.keys(platformNames).forEach((key) => {
//         if (value.toLowerCase().includes(key)) {
//           newName = platformNames[key];
//         }
//       });

//       updatedIcons[index] = { ...updatedIcons[index], url: value, name: newName };
//     } else {
//       updatedIcons[index] = { ...updatedIcons[index], [field]: value };
//     }

//     setSocialIcons(updatedIcons);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const updatedIcons = [...socialIcons];
//         updatedIcons[index].icon = reader.result as string;
//         setSocialIcons(updatedIcons);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddSocialIcon = () => {
//     setSocialIcons([...socialIcons, { name: "New Icon", url: "", icon: null }]);
//   };

//   const handleRemoveSocialIcon = (index: number) => {
//     const updatedIcons = socialIcons.filter((_, i) => i !== index);
//     setSocialIcons(updatedIcons);
//   };

//   const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedLanguage(e.target.value);
//   };

//   return (
//     <div className="card mb-4">
//       <div className="card-header bg-dark text-white">Header Top Section</div>
//       <div className="card-body">
//         <div className="mb-3">
//           <label className="form-label">Social Media Links</label>
//           {socialIcons.map((icon, index) => (
//             <div key={index} className="mb-3">
//               <label className="form-label">{icon.name} Icon</label>
//               <div className="d-flex align-items-center gap-2">
//                 {icon.icon && <img src={icon.icon} alt="Social Icon" width="40" height="40" />}
//                 <input
//                   type="file"
//                   className="form-control"
//                   accept="image/*"
//                   onChange={(e) => handleFileChange(e, index)}
//                 />
//               </div>
//               <div className="d-flex gap-2">
//                 <input
//                   type="text"
//                   className="form-control mt-2"
//                   value={icon.url}
//                   onChange={(e) => handleSocialChange(index, "url", e.target.value)}
//                   placeholder={`Enter ${icon.name} URL`}
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-danger mt-2"
//                   onClick={() => handleRemoveSocialIcon(index)}
//                 >
//                   &times;
//                 </button>
//               </div>
//             </div>
//           ))}
//           <button type="button" className="btn btn-secondary mt-2" onClick={handleAddSocialIcon}>
//             ➕ Add More
//           </button>
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Select Default Language</label>
//           <select className="form-select" value={selectedLanguage} onChange={handleLanguageChange}>
//             <option value="English">English</option>
//             <option value="Turkish">Turkish</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

interface SocialIcon {
  name: string;
  url: string;
  icon: string | null;
}

interface HeaderTopProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "social", index?: number) => void;
  handleSocialChange: (index: number, field: keyof SocialIcon, value: string) => void;
  handleAddSocialIcon: () => void;
  handleRemoveSocialIcon: (index: number) => void;
  selectedLanguage: string;
  title: string;
  logo: string | null;
  navLinks: string[];
  socialIcons: SocialIcon[];
  handleLanguageChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

// ✅ Pass `HeaderTopProps` as the type for props
const HeaderTop: React.FC<HeaderTopProps> = ({
  handleChange,
  handleFileChange,
  handleSocialChange,
  handleAddSocialIcon,
  handleRemoveSocialIcon,
  selectedLanguage,
  title,
  logo,
  navLinks,
  socialIcons,
  handleLanguageChange,
}) => {





  return (
    <div className="card mb-4">
           <div className="card-header bg-dark text-white">Header Top Section</div>
           <div className="card-body">
             <div className="mb-3">
               <label className="form-label">Social Media Links</label>
               {socialIcons.map((icon, index) => (
                <div key={index} className="mb-3">
                  <label className="form-label">{icon.name} Icon</label>
                  <div className="d-flex align-items-center gap-2">
                    {icon.icon && <img src={icon.icon} alt="Social Icon" width="40" height="40" />}
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e,"logo", index)}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control mt-2"
                      value={icon.url}
                      onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                      placeholder={`Enter ${icon.name} URL`}
                    />
                    <button
                      type="button"
                      className="btn btn-danger mt-2"
                      onClick={() => handleRemoveSocialIcon(index)}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-secondary mt-2" onClick={handleAddSocialIcon}>
                ➕ Add More
              </button>
            </div>
    
            <div className="mb-3">
              <label className="form-label">Select Default Language</label>
              <select className="form-select" value={selectedLanguage} onChange={(e)=>handleLanguageChange(e)}>
                <option value="English">English</option>
                <option value="Turkish">Turkish</option>
              </select>
            </div>
          </div>
        </div>
  );
};

export default HeaderTop;
