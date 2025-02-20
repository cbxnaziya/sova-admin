interface HeaderMainProps {
    title: string;
    logo: string | null;
    navLinks: string[];
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, type: "logo") => void;
    handleNavLinkChange: (index: number, value: string) => void;
    handleAddNavLink: () => void;
    handleRemoveNavLink: (index: number) => void;
  }
  
  export default function HeaderMain({
    title,
    logo,
    navLinks,
    handleChange,
    handleFileChange,
    handleNavLinkChange,
    handleAddNavLink,
    handleRemoveNavLink,
  }: HeaderMainProps) {
    return (
      <div className="card">
        <div className="card-header bg-dark  text-white">Main Header Section</div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Header Title</label>
            <input type="text" className="form-control" name="title" value={title} onChange={handleChange} />
          </div>
  
          <div className="mb-3">
            <label className="form-label">Logo</label>
            <div className="d-flex align-items-center gap-2">
              {logo && <img src={logo} alt="Logo" width="60" />}
              <input type="file" className="form-control" accept="image/*" onChange={(e) => handleFileChange(e, "logo")} />
            </div>
          </div>
  
          <div className="mb-3">
            <label className="form-label">Navigation Links</label>
            {navLinks.map((link, index) => (
              <div key={index} className="d-flex gap-2 mb-2">
                <input type="text" className="form-control" value={link} onChange={(e) => handleNavLinkChange(index, e.target.value)} />
                <button type="button" className="btn btn-danger" onClick={() => handleRemoveNavLink(index)}>
                &times;

                </button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary mt-2" onClick={handleAddNavLink}>
              ➕ Add More
            </button>
          </div>
        </div>
      </div>
    );
  }
  