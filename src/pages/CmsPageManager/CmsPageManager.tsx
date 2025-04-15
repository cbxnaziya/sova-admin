// import React, { useState, useEffect } from "react";

// import CustomEditor from "../../components/customEditor/customEditor";

// type Page = {
//   id: number;
//   name: string;
//   slug: string;
//   metaTitle: string;
//   metaDescription: string;
// };

// const CMSPageManager: React.FC = () => {
//   const [pages, setPages] = useState<Page[]>([
//     { id: 1, name: "Home", slug: "home", metaTitle: "", metaDescription: "" },
//     { id: 2, name: "About", slug: "about", metaTitle: "", metaDescription: "" },
//     { id: 3, name: "Contact", slug: "contact", metaTitle: "", metaDescription: "" },
//     { id: 4, name: "Privacy Policy", slug: "privacy-policy", metaTitle: "", metaDescription: "" },
//     { id: 5, name: "Shipping Policy", slug: "shipping-policy", metaTitle: "", metaDescription: "" },
//     { id: 6, name: "Payment Policy", slug: "payment-policy", metaTitle: "", metaDescription: "" },
//     { id: 7, name: "What's New", slug: "whats-new", metaTitle: "", metaDescription: "" },
//   ]);

//   const [isViewing, setIsViewing] = useState<boolean>(false);
//   const [selectedPage, setSelectedPage] = useState<Page | null>(null);

//   const handleView = (page: Page) => {
//     setSelectedPage(page);
//     setIsViewing(true);
//   };

//   const handleBack = () => {
//     setIsViewing(false);
//     setSelectedPage(null);
//   };

//   const handleSave = () => {
//     console.log("Editor Content:", editorContent);
//   };

//   const [editorContent, setEditorContent] = useState<string>("");
//   const [formErrors, setFormErrors] = useState({
//     name: "",
//     slug: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     let errors = { name: "", slug: "" };

//     // Validation
//     if (!selectedPage?.name) {
//       errors.name = "Page Name is required.";
//     }

//     if (!selectedPage?.slug) {
//       errors.slug = "Slug is required.";
//     }

//     // If errors, set form errors state and don't save
//     if (errors.name || errors.slug) {
//       setFormErrors(errors);
//       return;
//     }

//     // Call handleSave if no errors
//     handleSave();
//   };

//   // Auto-complete slug based on name
//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const nameValue = e.target.value;
//     if (selectedPage) {
//       setSelectedPage({
//         ...selectedPage,
//         name: nameValue,
//         slug: generateSlug(nameValue),
//       });
//     }
//   };

//   const generateSlug = (name: string) => {
//     return name
//       .toLowerCase()
//       .replace(/ /g, "-")
//       .replace(/[^\w-]+/g, "");
//   };

//   return (
//     <div>
//       {/* Table view */}
//       {!isViewing ? (
//         <>
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
//             All Pages
//           </h3>
//           <div className="d-flex justify-content-between align-items-start mb-3">
//             {/* Search Input - Left Aligned */}
//             <div className="d-flex align-items-center gap-2">
//               <input
//                 type="text"
//                 className="form-control"
//                 style={{ width: "180px", maxWidth: "100%" }}
//                 placeholder="Search here..."
//               />
//             </div>

//             {/* Buttons - Right Aligned */}
//             <div className="d-flex gap-2">
//               <button className="btn btn-dark" onClick={() => alert("Add Page functionality")}>
//                 + Add Page
//               </button>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="table table-striped table-bordered">
//               <thead>
//                 <tr>
//                   <th>Page Name</th>
//                   <th>Slug</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pages.map((page) => (
//                   <tr key={page.id}>
//                     <td>{page.name}</td>
//                     <td>{page.slug}</td>
//                     <td>
//                       <button
//                         className="btn btn-secondary btn-sm dropdown-toggle"
//                         type="button"
//                         data-bs-toggle="dropdown"
//                       >
//                         ⋮
//                       </button>
//                       <ul className="dropdown-menu">
//                         <li>
//                           <button className="dropdown-item" onClick={() => handleView(page)}>
//                             Edit
//                           </button>
//                         </li>
//                         <li>
//                           <button className="dropdown-item text-danger">
//                             Delete
//                           </button>
//                         </li>
//                       </ul>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       ) : (
//         /* Form view when viewing a page */
//         <div>
//           <button
//             onClick={handleBack}
//             className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 mb-4"
//           >
//             Back to Pages
//           </button>

//           {isViewing && selectedPage && (
//         <div>
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
//           Edit Page - {selectedPage.name}
//         </h3>

//         <form onSubmit={handleSubmit}>
//           {/* Page Name */}
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Page Name</label>
//             <input
//               type="text"
//               className="form-control"
//               value={selectedPage.name}
//               onChange={(e) => {
//                 const name = e.target.value;
//                 const autoGeneratedSlug = name
//                   .toLowerCase()
//                   .trim()
//                   .replace(/\s+/g, '-')
//                   .replace(/[^a-z0-9\-]/g, '')
//                   .replace(/\-+/g, '-');

//                 setSelectedPage((prev: any) =>
//                   prev
//                     ? {
//                         ...prev,
//                         name,
//                         slug:
//                           prev?.slugAutoModified || !prev.slug
//                             ? autoGeneratedSlug
//                             : prev.slug,
//                       }
//                     : null
//                 );
//               }}
//             />
//             {formErrors.name && <div className="text-red-600">{formErrors.name}</div>}
//           </div>

//           {/* Slug */}
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Slug</label>
//             <input
//               type="text"
//               className="form-control"
//               value={selectedPage.slug}
//               onChange={(e) => {
//                 const customSlug = e.target.value
//                   .toLowerCase()
//                   .trim()
//                   .replace(/\s+/g, '-')
//                   .replace(/[^a-z0-9\-]/g, '')
//                   .replace(/\-+/g, '-');

//                 setSelectedPage((prev: any) =>
//                   prev
//                     ? {
//                         ...prev,
//                         slug: customSlug,
//                         slugAutoModified: true,
//                       }
//                     : null
//                 );
//               }}
//             />
//             {formErrors.slug && <div className="text-red-600">{formErrors.slug}</div>}
//           </div>

//           {/* Meta Title (Optional) */}
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Meta Title (Optional)</label>
//             <input
//               type="text"
//               className="form-control"
//               value={selectedPage.metaTitle || ''}
//               onChange={(e) => {
//                 const metaTitle = e.target.value;
//                 setSelectedPage((prev: any) =>
//                   prev
//                     ? {
//                         ...prev,
//                         metaTitle,
//                       }
//                     : null
//                 );
//               }}
//             />
//           </div>

//           {/* Meta Description (Optional) */}
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Meta Description (Optional)</label>
//             <textarea
//               className="form-control"
//               rows={3}
//               value={selectedPage.metaDescription || ''}
//               onChange={(e) => {
//                 const metaDescription = e.target.value;
//                 setSelectedPage((prev: any) =>
//                   prev
//                     ? {
//                         ...prev,
//                         metaDescription,
//                       }
//                     : null
//                 );
//               }}
//             />
//           </div>

//           {/* Content */}
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Content</label>
//             <CustomEditor
//               value={editorContent}
//               onChange={(value: string) => setEditorContent(value)}
//             />
//           </div>

//           {/* Buttons */}
//           <div className="d-flex gap-2 mt-4">
//             <button className="btn btn-dark" type="submit">
//               Save
//             </button>
//             <button className="btn btn-outline-secondary" onClick={handleBack}>
//               Back
//             </button>
//           </div>
//         </form>
//       </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CMSPageManager;
import React, { useState } from "react";

import CustomEditor from "../../components/customEditor/customEditor";

type Page = {
  id: number;
  name: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
};

const CMSPageManager: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([
    { id: 1, name: "Home", slug: "home", metaTitle: "", metaDescription: "" },
    { id: 2, name: "About", slug: "about", metaTitle: "", metaDescription: "" },
    { id: 3, name: "Contact", slug: "contact", metaTitle: "", metaDescription: "" },
    { id: 4, name: "Privacy Policy", slug: "privacy-policy", metaTitle: "", metaDescription: "" },
    { id: 5, name: "Shipping Policy", slug: "shipping-policy", metaTitle: "", metaDescription: "" },
    { id: 6, name: "Payment Policy", slug: "payment-policy", metaTitle: "", metaDescription: "" },
    { id: 7, name: "What's New", slug: "whats-new", metaTitle: "", metaDescription: "" },
  ]);

  const [isViewing, setIsViewing] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);  // New state for adding a page
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  const handleView = (page: Page) => {
    setSelectedPage(page);
    setIsViewing(true);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setSelectedPage({ id: 0, name: "", slug: "", metaTitle: "", metaDescription: "" }); // Reset selectedPage for new page
  };

  const handleBack = () => {
    setIsViewing(false);
    setIsAdding(false);  // Reset "Add Page" state
    setSelectedPage(null);
  };

  const handleSave = () => {
    if (isAdding && selectedPage) {
      const newPage = { ...selectedPage, id: pages.length + 1 }; // New page with auto-generated ID
      setPages([...pages, newPage]); // Add the new page to the list
    }
    console.log("Editor Content:", editorContent);
  };

  const [editorContent, setEditorContent] = useState<string>("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    slug: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let errors = { name: "", slug: "" };

    // Validation
    if (!selectedPage?.name) {
      errors.name = "Page Name is required.";
    }

    if (!selectedPage?.slug) {
      errors.slug = "Slug is required.";
    }

    // If errors, set form errors state and don't save
    if (errors.name || errors.slug) {
      setFormErrors(errors);
      return;
    }

    // Call handleSave if no errors
    handleSave();
  };

  // Auto-complete slug based on name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    if (selectedPage) {
      setSelectedPage({
        ...selectedPage,
        name: nameValue,
        slug: generateSlug(nameValue),
      });
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    <div>
      {/* Table view */}
      {!isViewing && !isAdding ? (
        <>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            All Pages
          </h3>
          <div className="d-flex justify-content-between align-items-start mb-3">
            {/* Search Input - Left Aligned */}
            <div className="d-flex align-items-center gap-2">
              <input
                type="text"
                className="form-control"
                style={{ width: "180px", maxWidth: "100%" }}
                placeholder="Search here..."
              />
            </div>

            {/* Buttons - Right Aligned */}
            <div className="d-flex gap-2">
              <button className="btn btn-dark" onClick={handleAdd}>
                + Add Page
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Page Name</th>
                  <th>Slug</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <tr key={page.id}>
                    <td>{page.name}</td>
                    <td>{page.slug}</td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        ⋮
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button className="dropdown-item" onClick={() => handleView(page)}>
                            Edit
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item text-danger">
                            Delete
                          </button>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* Form view when adding a page or viewing/editing a page */
        <div>
          <button
            onClick={handleBack}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 mb-4"
          >
            Back to Pages
          </button>

          {(isViewing || isAdding) && selectedPage && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
                {isAdding ? "Add New Page" : `Edit Page - ${selectedPage.name}`}
              </h3>

              <form onSubmit={handleSubmit}>
{/* Page Name */}
<div className="mb-3">
  <label className="form-label fw-semibold">Page Name</label>
  <input
    type="text"
    className="form-control"
    value={selectedPage.name}
    onChange={(e) => {
      const name = e.target.value;

      // Auto-generate slug when the name changes
      const autoGeneratedSlug = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '')
        .replace(/\-+/g, '-');

      // Update the name and only auto-generate the slug if it's not already set
      setSelectedPage((prev: any) => 
        prev 
          ? {
              ...prev,
              name,
              slug: prev.slugAutoModified || !prev.slug ? autoGeneratedSlug : prev.slug, // Auto-generate slug if empty or not modified
            }
          : null
      );
    }}
  />
  {formErrors.name && <div className="text-red-600">{formErrors.name}</div>}
</div>

{/* Slug */}
<div className="mb-3">
  <label className="form-label fw-semibold">Slug</label>
  <input
    type="text"
    className="form-control"
    value={selectedPage.slug}
    onChange={(e) => {
      const customSlug = e.target.value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '')
        .replace(/\-+/g, '-');

      // When user modifies slug, mark it as manually modified
      setSelectedPage((prev: any) =>
        prev
          ? {
              ...prev,
              slug: customSlug,
              slugAutoModified: true,  // Mark it as manually modified
            }
          : null
      );
    }}
  />
  {formErrors.slug && <div className="text-red-600">{formErrors.slug}</div>}
</div>


                {/* Meta Title (Optional) */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Meta Title (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedPage.metaTitle || ""}
                    onChange={(e) => {
                      const metaTitle = e.target.value;
                      setSelectedPage((prev: any) =>
                        prev
                          ? {
                              ...prev,
                              metaTitle,
                            }
                          : null
                      );
                    }}
                  />
                </div>

                {/* Meta Description (Optional) */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Meta Description (Optional)</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={selectedPage.metaDescription || ""}
                    onChange={(e) => {
                      const metaDescription = e.target.value;
                      setSelectedPage((prev: any) =>
                        prev
                          ? {
                              ...prev,
                              metaDescription,
                            }
                          : null
                      );
                    }}
                  />
                </div>

                {/* Content */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Content</label>
                  <CustomEditor
                    value={editorContent}
                    onChange={(value: string) => setEditorContent(value)}
                  />
                </div>

                {/* Buttons */}
                <div className="d-flex gap-2 mt-4">
                  <button className="btn btn-dark" type="submit">
                    Save
                  </button>
                  <button className="btn btn-outline-secondary" onClick={handleBack}>
                    Back
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CMSPageManager;
