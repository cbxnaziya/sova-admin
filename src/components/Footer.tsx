"use client";
import { useState } from "react";
import { toast } from "react-toastify";


interface LinkItem {
    label: string;
    url: string;
  }
  
  interface Section {
    title: string;
    links: LinkItem[];
  }
  
  interface FooterData {
    logoUrl: string;
    socialLinks: { icon: string; url: string }[];
    quickLinks: Section;
    supermarketLinks: Section;
    shelvingLinks: Section;
    newsletter: {
        title: string;
        description: string;
      };
    copyright: string;
  }
  

interface SocialLink {
  icon: string;
  url: string;
}

export default function Footer() {
//   const [footerData, setFooterData] = useState({
//     logoUrl: "",
//     socialLinks: [] as SocialLink[],
//     quickLinks: [] as LinkItem[],
//     supermarketLinks: [] as LinkItem[],
//     shelvingLinks: [] as LinkItem[],
//     copyright: `\u00A9 ${new Date().getFullYear()} MyEcommerce. All Rights Reserved.`,
//   });
const [footerData, setFooterData] = useState<FooterData>({
    logoUrl: "",
    socialLinks: [
      { icon: "/images/facebook.png", url: "https://facebook.com" },
      { icon: "/images/twitter.png", url: "https://twitter.com" },
    ],
    quickLinks: {
      title: "Quick Links",
      links: [
        { label: "Home", url: "/" },
        { label: "Shop", url: "/shop" },
      ],
    },
    supermarketLinks: {
      title: "Supermarkets",
      links: [
        { label: "Walmart", url: "https://www.walmart.com" },
        { label: "Costco", url: "https://www.costco.com" },
      ],
    },
    shelvingLinks: {
      title: "Shelving Market",
      links: [
        { label: "IKEA Shelving", url: "https://www.ikea.com" },
        { label: "Home Depot Shelving", url: "https://www.homedepot.com" },
      ],
    },
    newsletter: {
      title: "Subscribe to Our Newsletter",
      description: "Stay updated with our latest products, offers, and news.",
    },
    copyright: `© ${new Date().getFullYear()} MyEcommerce. All Rights Reserved.`,
  });
  

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, key: keyof typeof footerData) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFooterData((prev) => ({ ...prev, [key]: imageUrl }));
    }
  };
 
  const handleTitleChange = (key: keyof FooterData, value: string) => {
    setFooterData((prev) => ({
      ...prev,
      [key]: { ...prev[key] as Section, title: value },
    }));
  };
  
  const handleLinkChange = (
    key: keyof FooterData,
    index: number,
    field: keyof LinkItem,
    value: string
  ) => {
    setFooterData((prev) => {
      const updatedLinks = [...(prev[key] as Section).links];
      updatedLinks[index] = { ...updatedLinks[index], [field]: value };
      return { ...prev, [key]: { ...prev[key] as Section, links: updatedLinks } };
    });
  };
  
  const addLink = (key: keyof FooterData) => {
    setFooterData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key] as Section,
        links: [...(prev[key] as Section).links, { label: "", url: "" }],
      },
    }));
  };
  
  const removeLink = (key: keyof FooterData, index: number) => {
    setFooterData((prev) => {
      const updatedLinks = (prev[key] as Section).links.filter((_, i) => i !== index);
      return { ...prev, [key]: { ...prev[key] as Section, links: updatedLinks } };
    });
  };
  

  const handleSocialChange = (index: number, key: keyof SocialLink, value: string) => {
    setFooterData((prev) => {
      const updatedSocialLinks = [...prev.socialLinks];
      updatedSocialLinks[index][key] = value;
      return { ...prev, socialLinks: updatedSocialLinks };
    });
  };
  const removeSocialLink = (index: number) => {
    setFooterData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const addSocialLink = () => {
    setFooterData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { icon: "", url: "" }],
    }));
  };

    const handleSave = () => {
        console.log("hiii");
        

      toast.success("Operation successful! 🎉");
    };

  return (
    <>
    <footer className=" text-light py-4">
           {/* Save Button */}
 
      <div className="container">
   <div className="d-flex justify-content-end">
    
    <button className="btn btn-success mb-3" onClick={()=>handleSave()}>
       Save
     </button>
    </div>
        <div className="text-dark">

   Footer Top
</div>
        <div className="row text-center text-md-start border-1  p-2 rounded">
          <div className="col-md-6 mb-3 text-dark"> Upload Logo 
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "logoUrl")} />
            {footerData.logoUrl && <img src={footerData.logoUrl} alt="Logo" width={150} height={50} />}
          </div>


          <div className="col-md-6 d-flex flex-column">
            {footerData.socialLinks.map((link, index) => (
              <div key={index} className="d-flex align-items-center mb-2 ">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleSocialChange(index, "icon", URL.createObjectURL(e.target.files?.[0]!))}
                />
                {link.icon && <img src={link.icon} alt="Social Icon" width={30} height={30} />}
                <input
                  type="text"
                  placeholder="Social Media URL"
                  value={link.url}
                  onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                  className="form-control mx-2"
                />
                <button onClick={() => removeSocialLink(index)} className="btn btn-danger">
                  {/* <FaTrash /> */}        &times;
                </button>
              </div>
            ))}
            <button onClick={addSocialLink} className="btn btn-dark">
            Add Social Link
            </button>
          </div>
        </div>
        <hr className="bg-light" />
{/* Dynamic Links Sections */}
{(["quickLinks", "supermarketLinks", "shelvingLinks"] as (keyof FooterData)[]).map((key, i) => (
  <div key={key} className="row mb-3 border-1 p-2 rounded">
    <div className="text-dark">
      Section {i + 1}
    </div>
    <div className="col-md-6">
      {/* Section Title Input */}
      <input
        type="text"
        className="form-control mb-2"
        value={(footerData[key] as Section).title}
        onChange={(e) => handleTitleChange(key, e.target.value)}
      />
      {/* Links Management */}
      {(footerData[key] as Section).links.map((link, index) => (
        <div key={index} className="d-flex align-items-center mb-2">
          <input
            type="text"
            placeholder="Label"
            value={link.label}
            onChange={(e) => handleLinkChange(key, index, "label", e.target.value)}
            className="form-control me-2"
          />
          <input
            type="text"
            placeholder="URL"
            value={link.url}
            onChange={(e) => handleLinkChange(key, index, "url", e.target.value)}
            className="form-control me-2"
          />
          <button onClick={() => removeLink(key, index)} className="btn btn-danger">
            &times;
          </button>
        </div>
      ))}
      <button onClick={() => addLink(key)} className="btn btn-dark">
        Add Link
      </button>
    </div>
  </div>
))}

{/* Subscribe to Our Newsletter Section */}
<div className="row mb-3 border-1 p-2 rounded">
  <div className="text-dark">
    Section 4
  </div>
  <div className="col-md-6">
    {/* Newsletter Title */}
    <input
      type="text"
      className="form-control mb-2"
      value={footerData.newsletter.title}
      onChange={(e) =>
        setFooterData((prev) => ({
          ...prev,
          newsletter: { ...prev.newsletter, title: e.target.value },
        }))
      }
    />
    {/* Newsletter Description */}
    <textarea
      className="form-control mb-2"
      rows={3}
      value={footerData.newsletter.description}
      onChange={(e) =>
        setFooterData((prev) => ({
          ...prev,
          newsletter: { ...prev.newsletter, description: e.target.value },
        }))
      }
    />
  </div>
</div>

        <hr className="bg-light" />
        <div className="text-dark">

Footer Bottom
</div>
        <div className="text-center border-1  p-2 rounded">
          <input
            type="text"
            className="form-control mb-2"
            value={footerData.copyright}
            onChange={(e) => setFooterData({ ...footerData, copyright: e.target.value })}
          />
        </div>
      </div>
    </footer>


    </>

  );
}
