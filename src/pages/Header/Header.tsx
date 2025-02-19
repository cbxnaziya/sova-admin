import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface SocialIcon {
  name: string;
  url: string;
  icon: string | null;
}

interface HeaderData {
  title: string;
  logo: string | null;
  navLinks: string[];
  socialIcons: SocialIcon[];
  selectedLanguage: string;
}

export default function HeaderSettings() {
  const [headerData, setHeaderData] = useState<HeaderData>({
    title: "E-commerce Admin Panel",
    logo: null,
    navLinks: ["Home", "Products", "Orders", "Customers"],
    socialIcons: [
      { name: "Facebook", url: "", icon: null },
      { name: "Twitter", url: "", icon: null },
      { name: "Instagram", url: "", icon: null },
    ],
    selectedLanguage: "English",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHeaderData({ ...headerData, [name]: value });
  };

  const handleNavLinkChange = (index: number, value: string) => {
    const updatedLinks = [...headerData.navLinks];
    updatedLinks[index] = value;
    setHeaderData({ ...headerData, navLinks: updatedLinks });
  };

  const handleSocialChange = (index: number, field: keyof SocialIcon, value: string) => {
    const updatedIcons = [...headerData.socialIcons];
    updatedIcons[index] = { ...updatedIcons[index], [field]: value };
    setHeaderData({ ...headerData, socialIcons: updatedIcons });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "social", index?: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === "logo") {
          setHeaderData({ ...headerData, logo: reader.result as string });
        } else if (index !== undefined) {
          handleSocialChange(index, "icon", reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSocialIcon = () => {
    setHeaderData({
      ...headerData,
      socialIcons: [...headerData.socialIcons, { name: "New Social", url: "", icon: null }],
    });
  };

  const handleRemoveSocialIcon = (index: number) => {
    const updatedIcons = headerData.socialIcons.filter((_, i) => i !== index);
    setHeaderData({ ...headerData, socialIcons: updatedIcons });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Header Data:", headerData);
    alert("Header settings updated successfully!");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Update Header Settings</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-header bg-dark text-white">Header Top Section</div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Social Media Links</label>
              {headerData.socialIcons.map((icon, index) => (
                <div key={index} className="mb-3">
                  <label className="form-label">{icon.name} Icon</label>
                  <div className="d-flex align-items-center gap-2">
                    {icon.icon && <img src={icon.icon} alt="Social Icon" width="40" height="40" />}
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "social", index)}
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
                    <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveSocialIcon(index)}>
                      ❌
                    </button>
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-secondary mt-2" onClick={handleAddSocialIcon}>
                ➕ Add More
              </button>
            </div>

            <div className="mb-3">
              <label className="form-label">Select Language</label>
              <select
                className="form-select"
                name="selectedLanguage"
                value={headerData.selectedLanguage}
                onChange={handleChange}
              >
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
                <option value="German">German</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Header Section */}
        <div className="card">
          <div className="card-header bg-primary text-white">Main Header Section</div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Header Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={headerData.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Logo</label>
              <div className="d-flex align-items-center gap-2">
                {headerData.logo && <img src={headerData.logo} alt="Logo" width="60" />}
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "logo")}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Navigation Links</label>
              {headerData.navLinks.map((link, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control mb-2"
                  value={link}
                  onChange={(e) => handleNavLinkChange(index, e.target.value)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-end mt-3">
          <button type="submit" className="btn btn-success">
            💾 Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
