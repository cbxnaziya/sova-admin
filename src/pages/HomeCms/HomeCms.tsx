// import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// import axios from 'axios';
// import api from '../../utills/api';

// interface HomePageCMSFormData {
//   _id: string;
//   heading: string;
//   backgroundImage: File | null | string;
//   subHeading: string;
//   metaTitle: string;
//   metaDescription: string;
// }

// const HomeCMS: React.FC = () => {
//   const [formData, setFormData] = useState<HomePageCMSFormData>({
//     _id: '',
//     backgroundImage: null,
//     heading: '',
//     subHeading: '',
//     metaTitle: '',
//     metaDescription: '',
//   });

//   const [previewImage, setPreviewImage] = useState<string | null>(null);

//   // 🚀 Fetch initial data
//   useEffect(() => {
//     const fetchCMSData = async () => {
//       try {
//         const response = await api.get('admin/api/cms-home'); // 🔁 Your backend endpoint
//         const data = response.data.home;
//         console.log('CMS Data:', response); // Debugging line
        

//         setFormData({
//           _id: data._id, // string (MongoDB ID)
//           backgroundImage: data.heroSection.backgroundImage, // string (image URL)
//           heading: data.heroSection.heading || '',
//           subHeading: data.heroSection.subHeading || '',
//           metaTitle: data.heroSection.metaTitle || '',
//           metaDescription: data.heroSection.metaDescription || '',
//         });

//         setPreviewImage(data.backgroundImage); // if it's an image URL
//       } catch (error) {
//         console.error('Failed to fetch CMS data', error);
//       }
//     };

//     fetchCMSData();
//   }, []);

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const target = e.target;

//     if (target.name === 'backgroundImage' && target instanceof HTMLInputElement) {
//       const file = target.files?.[0];
//       if (file) {
//         setPreviewImage(URL.createObjectURL(file));
//         setFormData((prev: any) => ({ ...prev, backgroundImage: file }));
//       }
//     } else {
//       setFormData((prev) => ({ ...prev, [target.name]: target.value }));
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const data = new FormData();
//     if (formData.backgroundImage instanceof File) {
//       data.append('backgroundImage', formData.backgroundImage);
//     }

//     data.append('heading', formData.heading);
//     data.append('subHeading', formData.subHeading);
//     data.append('metaTitle', formData.metaTitle);
//     data.append('metaDescription', formData.metaDescription);

//     try {
//       const response = await api.put('admin/api/cms-home/update', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         params:{
//           id: '6800b3732b3e5fe6a356379c', // Assuming you need to send an ID or some identifier
//         }
//       });
//       console.log('Saved:', response.data);
//       alert('Content saved successfully!');
//     } catch (error) {
//       console.error('Save error:', error);
//       alert('Failed to save CMS content');
//     }
//   };

//   return (
//     <div className="table-responsive">
//       <h3 className="text-lg font-semibold">Home Page</h3>
//       <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
//         <h2 className="text-2xl font-bold mb-4">Hero Section</h2>
//         <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Background Image</label>
//             <input
//               type="file"
//               name="backgroundImage"
//               accept="image/*"
//               onChange={handleChange}
//               className="mt-1 block w-full"
//             />
//             {previewImage && (
//               <img
//                 src={previewImage}
//                 alt="Preview"
//                 className="mt-2 w-full max-h-48 object-cover rounded border"
//               />
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Heading</label>
//             <input
//               type="text"
//               name="heading"
//               value={formData.heading}
//               onChange={handleChange}
//               className="mt-1 block w-full border rounded px-3 py-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Sub Heading</label>
//             <input
//               type="text"
//               name="subHeading"
//               value={formData.subHeading}
//               onChange={handleChange}
//               className="mt-1 block w-full border rounded px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Meta Title</label>
//             <input
//               type="text"
//               name="metaTitle"
//               value={formData.metaTitle}
//               onChange={handleChange}
//               className="mt-1 block w-full border rounded px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Meta Description</label>
//             <textarea
//               name="metaDescription"
//               value={formData.metaDescription}
//               onChange={handleChange}
//               rows={3}
//               className="mt-1 block w-full border rounded px-3 py-2"
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default HomeCMS;

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import api from '../../utills/api';

interface HomePageCMSFormData {
  _id: string;
  heading: string;
  backgroundImage: File | null | string;
  subHeading: string;
  metaTitle: string;
  metaDescription: string;
}

interface Service {
  serviceName: string;
  serviceDescription: string;
  serviceImage: File | null;
  preview?: string;
}

const HomeCMS: React.FC = () => {
  const [formData, setFormData] = useState<HomePageCMSFormData>({
    _id: '',
    backgroundImage: null,
    heading: '',
    subHeading: '',
    metaTitle: '',
    metaDescription: '',
  });

  const [servicesHeading, setServicesHeading] = useState<string>('');
  const [servicesSubHeading, setServicesSubHeading] = useState<string>('');

  const [services, setServices] = useState<Service[]>([
    { serviceName: '', serviceDescription: '', serviceImage: null },
  ]);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCMSData = async () => {
      try {
        const response = await api.get('admin/api/cms-home');
        const data = response.data.home;

        setFormData({
          _id: data._id,
          backgroundImage: data.heroSection.backgroundImage,
          heading: data.heroSection.heading || '',
          subHeading: data.heroSection.subHeading || '',
          metaTitle: data.heroSection.metaTitle || '',
          metaDescription: data.heroSection.metaDescription || '',
        });

        setPreviewImage(data.heroSection.backgroundImage);

        setServicesHeading(data.servicesSection?.heading || '');
        setServicesSubHeading(data.servicesSection?.subHeading || '');
        setServices(data.servicesSection?.services || []);
      } catch (error) {
        console.error('Failed to fetch CMS data', error);
      }
    };

    fetchCMSData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'backgroundImage' && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0];
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
        setFormData((prev: any) => ({ ...prev, backgroundImage: file }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    if (formData.backgroundImage instanceof File) {
      data.append('backgroundImage', formData.backgroundImage);
    }

    data.append('heading', formData.heading);
    data.append('subHeading', formData.subHeading);
    data.append('metaTitle', formData.metaTitle);
    data.append('metaDescription', formData.metaDescription);
    console.log('Form Data:', data); // Debugging line
    console.log('formData._id', formData._id); // Debugging line

    try {
      const response = await api.put('admin/api/cms-home/update', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: { id: formData._id },
      });
      alert('Hero section saved!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save hero section');
    }
  };

  // 🧩 Services Section Logic
  const handleServiceChange = (index: number, field: string, value: any) => {
    const updated = [...services];
    (updated[index] as any)[field] = value;
    setServices(updated);
  };

  const handleServiceImageChange = (index: number, file: File) => {
    const updated = [...services];
    updated[index].serviceImage = file;
    updated[index].preview = URL.createObjectURL(file);
    setServices(updated);
  };

  const addService = () => {
    setServices([
      ...services,
      { serviceName: '', serviceDescription: '', serviceImage: null },
    ]);
  };

  const removeService = (index: number) => {
    const updated = [...services];
    updated.splice(index, 1);
    setServices(updated);
  };

  const handleServiceSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('heading', servicesHeading);
    data.append('subHeading', servicesSubHeading);

    services.forEach((service, idx) => {
      data.append(`services[${idx}][serviceName]`, service.serviceName);
      data.append(`services[${idx}][serviceDescription]`, service.serviceDescription);
      if (service.serviceImage) {
        data.append(`services[${idx}][serviceImage]`, service.serviceImage);
      }
    });

    try {
      const response = await api.post('admin/api/cms-home/services', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Services saved successfully!');
    } catch (error) {
      console.error('Service save error:', error);
      alert('Failed to save services');
    }
  };

  return (
    <div className="table-responsive space-y-10">
      {/* 🚩 Hero Section */}
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4">Hero Section</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Background Image</label>
            <input
              type="file"
              name="backgroundImage"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {previewImage && (
              <img src={previewImage} alt="Preview" className="mt-2 w-full max-h-48 rounded border" />
            )}
          </div>

          <input type="text" name="heading" value={formData.heading} onChange={handleChange} placeholder="Heading" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="subHeading" value={formData.subHeading} onChange={handleChange} placeholder="Sub Heading" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} placeholder="Meta Title" className="w-full border px-3 py-2 rounded" />




          <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} placeholder="Meta Description" rows={3} className="w-full border px-3 py-2 rounded" />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update</button>
        </form>
      </div>

      {/* 🔧 Services Section */}
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4">Services Section</h2>
        <form onSubmit={handleServiceSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Services Heading"
            value={servicesHeading}
            onChange={(e) => setServicesHeading(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Services Subheading"
            value={servicesSubHeading}
            onChange={(e) => setServicesSubHeading(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          {services.map((service, index) => (
            <div key={index} className="space-y-2 border-b pb-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Service #{index + 1}</h4>
                {index >= 0 && (
                  <button type="button" onClick={() => removeService(index)} className="text-red-500 text-sm">
                    Remove
                  </button>
                )}
              </div>
              <input type="text" placeholder="Service Name" value={service.serviceName} onChange={(e) => handleServiceChange(index, 'serviceName', e.target.value)} className="w-full border px-3 py-2 rounded" />
              <textarea placeholder="Service Description" value={service.serviceDescription} onChange={(e) => handleServiceChange(index, 'serviceDescription', e.target.value)} rows={2} className="w-full border px-3 py-2 rounded" />
              <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleServiceImageChange(index, e.target.files[0])} />
              {service.preview && (
                <img src={service.preview} alt="Preview" className="mt-2 max-h-32 rounded border" />
              )}
            </div>
          ))}

          <button type="button" onClick={addService} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            + Add Service
          </button>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 block mt-4">
            Save Services
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeCMS;
