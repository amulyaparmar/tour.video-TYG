"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";

const communitySliderData = [
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/cc03b26d-c873-4d09-d8e1-517e0e062400/150pxProfileTYG',
    caption: '25k Tours',
    communityName: 'Marshall Louisville',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/bc2ef844-b351-4404-23c5-ca2352fcc000/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/6f8904fc-89d8-4375-2fc2-7c9d6dadf200/150pxProfileTYG',
    caption: '1.4k International Tours',
    communityName: 'Hawks Landing',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/adeba541-555e-44cf-b8f4-64d2158c7d00/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/734d98e7-d07f-47a7-20ed-7b500f420b00/150pxProfileTYG',
    caption: '$70k+ Revenue Generated from Tour',
    communityName: 'Campus Walk',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/f579de30-ea39-4214-0612-8f80d34eaa00/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/4909e798-3cd4-44ba-509f-f14a9ec01200/150pxProfileTYG',
    caption: '21k Tours',
    communityName: 'Latitude',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/106dc1ed-9f24-4b2a-eaf5-f7a4ab370000/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/e2fcd283-7b3d-4463-c327-fbc3c50f6100/150pxProfileTYG',
    caption: '$85k Revenue Generated',
    communityName: 'Noble 2500',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/1ba9d2e5-baf5-4417-a0d3-c23a48f57a00/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/7167ce7e-3135-49a8-0ea4-2a614e967900/150pxProfileTYG',
    caption: '15k Tours + $300k Revenue Generated',
    communityName: 'CastleRock San Marcos',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/64756cb6-51b5-4b38-eda5-79740913ec00/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/1d911fb6-23ba-4507-141a-0da95278c900/150pxProfileTYG',
    caption: '3k Tours +  $220k Revenue Generated',
    communityName: 'Paloma West Midtown',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/38bf0294-d7f5-4a2f-4a86-c309b2db9c00/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/0f63db51-d9f6-420f-8eba-759fd0073100/150pxProfileTYG',
    caption: '7.4k Tours + $850k Revenue Generated',
    communityName: 'One Park',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/1e5b8871-d023-4b4c-bdc2-d7d8a0683400/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/3c550765-aae7-4a77-2507-7f66e635b000/150pxProfileTYG',
    caption: '18k Tours',
    communityName: 'Lodges at 777',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/ac58e77c-37da-42ff-8898-0cba57e6af00/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/b01ef428-6a14-4661-4b0b-4d3c9f04e600/150pxProfileTYG',
    caption: '12k Tours + $550k Revenue Generated',
    communityName: 'HWH Luxury Living',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/1fa1af12-4aa5-4820-49ef-3a3bcbdebe00/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/e1d7b510-f60a-4b43-c83d-2146ad4e3a00/150pxProfileTYG',
    caption: '125% increase in conversion',
    communityName: 'Douglas Heights',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/98a44ab2-8726-4204-c056-694f926b9600/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/41105640-d9a0-46e9-b7f4-287dba728300/150pxProfileTYG',
    caption: '150% increase in conversion',
    communityName: 'Arba',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/a4849728-6920-4ef4-c889-e29365a86500/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/ff27792c-3d5f-4ec8-f42d-7b91dd582f00/150pxProfileTYG',
    caption: '$129k in Revenue generated',
    communityName: 'The Rowan',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/b731c164-2f1f-475b-0d41-fce2f08b2a00/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/fe586b4f-4e04-420c-7978-b9a9f361e700/150pxProfileTYG',
    caption: '120% Conversion Rate',
    communityName: 'The Rockland',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/b731c164-2f1f-475b-0d41-fce2f08b2a00/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/25542c0e-6369-40eb-e7b6-53aaa48cd800/150pxProfileTYG',
    caption: '$40k Revenue Generated',
    communityName: 'The Hue',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/2322595b-7320-491c-239d-4248af567300/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/3f316b49-e66a-49bf-237e-61ec9ae9f900/150pxProfileTYG',
    caption: '5.5k Tours + $40k in Leadgen',
    communityName: 'The Academy on Charles',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/411c005f-4415-495f-659e-3dde79202900/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/ff99c810-45b3-4221-90f5-7f72749e3100/150pxProfileTYG',
    caption: '6.2k Tours + $241k in Leadgen',
    communityName: 'The Village at Chandler Crossings',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/c065befd-23d3-41aa-b45e-ad736ceb6700/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/3f36217d-64a7-4206-fe12-c8f321649c00/150pxProfileTYG',
    caption: '6.2k Tours + 340 5-Star Testimonials',
    communityName: 'The Edge on Euclid',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/f19125bc-b789-473d-236f-8c502895d900/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/6acb8d71-74f4-4a8a-ecbf-e3e083661e00/150pxProfileTYG',
    caption: '300+ Applicants',
    communityName: 'Desai Accelerator',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/67d332fd-c506-46fb-40e0-a161d24da800/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/3e1a95d3-e381-45e7-b62a-5bb064736700/150pxProfileTYG',
    caption: '$200k Revenue from Tour',
    communityName: 'HCC College',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/ba63783c-ba12-4505-2593-42feb2ce9700/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/26a7fd6e-0571-474e-85c5-8ab6dd4fcd00/150pxProfileTYG',
    caption: '$240k generated + 340 Reviews',
    communityName: 'Forward Medical',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/cee35afd-a1ce-45ed-d89a-60ad6ad7bd00/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/baab8f17-bc67-42a7-520c-842d652afe00/150pxProfileTYG',
    caption: '210% Conversion Rate & Hired 2 Folks',
    communityName: 'Lambda School/ Bloomtech',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/53ea0757-f5f8-4c61-67f3-b7d64e53f300/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/b9d63c8a-cdf3-48b2-9540-055236e5ab00/150pxProfileTYG',
    caption: '150% increase in Conversion',
    communityName: 'PNOE',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/56cd2bef-a390-4a20-6228-d0b3454e2100/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/7a2cff03-6b58-4f53-80fe-c93743be6400/150pxProfileTYG',
    caption: '8k Onboarded',
    communityName: 'DESO',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/b831e49d-f1dd-4b10-4131-3984734e4300/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/b4f16062-a6ac-4a2f-b210-11b3a9611600/150pxProfileTYG',
    caption: '140%+ Onboarding increase + 215.7k Followers',
    communityName: 'Creator.app',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/df398489-f15f-415d-c69a-9b05a182b400/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/24662403-ae4b-4abb-6231-3a4244bb1100/150pxProfileTYG',
    caption: '210% increase in conversion',
    communityName: 'RAMP',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/9be7e2b4-42b0-40b7-b1eb-4f5893488f00/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/1c9259ef-1877-4774-ec5e-707eb62f0e00/150pxProfileTYG',
    caption: 'Onboarded 15k new Engineers',
    communityName: 'WeWork',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/09a53245-fe76-4620-2f8e-c45aedced900/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/3a47b3a7-75a1-4142-7ddb-db9c28f43100/150pxProfileTYG',
    caption: '124%+ in Conversion',
    communityName: 'University of Michigan',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/67a6cb75-2399-4794-a589-4fba7e8db300/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/179e0c4a-3ab1-4f91-045d-fcbe4e26b500/150pxProfileTYG',
    caption: 'Onboarded 7k Community',
    communityName: 'SaaStr',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/ededba95-3e75-4d19-4f5a-ac9e128c1a00/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/6ebcf654-666c-4462-81f8-88a65b3b6d00/150pxProfileTYG',
    caption: '150% in Conversion + $440k in Sales',
    communityName: 'X Communities',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/d7fde5fe-6428-42b8-b44b-912124a15a00/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/b06d761a-2dba-4242-1b00-175602644100/150pxProfileTYG',
    caption: '12k Tours + $440k in Sales',
    communityName: 'Two East Oak',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/fe2cff69-52a8-4a5b-a891-a8f86e13a600/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/9e688e13-1762-45d9-ca59-836284857c00/150pxProfileTYG',
    caption: '150% in Onboarding Conversion',
    communityName: 'YC',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/055141a0-8e56-4a3a-20bd-dd089d3b2b00/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/2ce0b833-5605-4d7c-cdc1-20f8fcb60500/150pxProfileTYG',
    caption: '$1.2m in Tour-driven Sales',
    communityName: 'Independence Village Oxford',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/de18508f-0142-4ef2-47d6-96d66ecd6f00/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/7a0947d9-1dfe-4645-32a7-44cab66a7c00/150pxProfileTYG',
    caption: '4k Tours and $800k in Tour-driven Sales',
    communityName: 'The George',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/8b6b4e88-4b7f-4c3c-6915-c3a75d9d2600/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/e7361926-fa46-4963-42fe-bf99570cbe00/150pxProfileTYG',
    caption: '2k Tours and $750k in Tour-driven Sales',
    communityName: 'Park Place',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/a202f566-30a4-4b09-972c-1cb221772b00/400pxHeight',
    tourLink: '',
  },
  {
    Bonus: '',
    agent:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/06828e5d-6e41-4981-824b-24d7cf61a600/150pxProfileTYG',
    caption: '89%+ in Conversion',
    communityName: 'Speechify',
    cover:
      'https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/806e516a-3bd3-4dee-5385-1577afad3c00/400pxHeight',
    tourLink: '',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <header className="flex items-center justify-between w-full px-8 py-4">
        <div className="flex items-center space-x-4">
          <a href="#" className="text-2xl font-bold">
            Tour
          </a>
          <nav className="hidden space-x-6 md:flex">
            <a href="#" className="text-lg">
              Product
            </a>
            <a href="#" className="text-lg">
              Results
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-lg">
            EN
          </a>
          <a  href="https://app.usetour.com/book-demo"
             target="_blank" className="text-lg">
            Sign In
          </a>
          <a className="px-4 py-2 text-white bg-black rounded"
             href="https://app.usetour.com/signup"
             target="_blank"
          >Sign Up</a>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 text-center">
        <div className="flex items-center space-x-2">
          {/* <div className="flex -space-x-2">
            <img src="/placeholder.svg" width={40} height={40} className="rounded-full" alt="Avatar 1" />
            <img src="/placeholder.svg" width={40} height={40} className="rounded-full" alt="Avatar 2" />
            <img src="/placeholder.svg" width={40} height={40} className="rounded-full" alt="Avatar 3" />
            <img src="/placeholder.svg" width={40} height={40} className="rounded-full" alt="Avatar 4" />
            <img src="/placeholder.svg" width={40} height={40} className="rounded-full" alt="Avatar 5" />
          </div> */}
          <span className="px-3 py-1 text-sm bg-gray-100 rounded-full">
            Loved by 200+ Communities & Property Managers
          </span>
        </div>
        <h1 className="mt-6 text-4xl font-bold sm:text-5xl md:text-6xl">
          Interactive, virtual tours that 
          <br />
          get your apartment more <span className="text-blue-600 bg-blue-100 px-2">leases</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          An intelligent way to convert anonymous visitors into qualified leads
        </p>
        <div className="flex mt-8 space-x-4">
          <a className="px-6 py-3 text-white bg-blue-600 rounded"
             href="https://app.usetour.com/book-demo"
             target="_blank"
          >
            Book personalized 1-1 demo
          </a>
          <a className="flex items-center px-6 py-3 bg-gray-100 rounded"
            href="https://app.usetour.com/signin"
            target="_blank"
          >
            <img src="https://framerusercontent.com/images/TB6eIAzWtKxopSGYmkccwryew.png" width={20} height={20} alt="Google" />
            <span className="ml-2">Try Tour for 30 days</span>
          </a>
        </div>
      </main>
      <section className="flex flex-wrap justify-center w-full px-4 py-8 gap-6">
          {communitySliderData.map((community, index) => (
            <div key={index} className="relative w-full md:w-[calc(25%-1rem)] overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
              <img 
                src={community.cover} 
                className="w-full h-64 object-cover" 
                alt={community.communityName} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white mb-1">{community.communityName}</h3>
                <p className="text-sm text-gray-200">{community.caption}</p>
              </div>
            </div>
          ))}
        </section>
<div className="container mx-auto px-4">
  <header className="flex justify-between items-center py-4">
    <div className="flex items-center">
      <div className=" text-blue-500 p-2 rounded-lg mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21" fill="none">
          <path d="M17.0013 8.75715C18.3556 9.53095 18.3556 11.4837 17.0013 12.2575L3.62835 19.8984C2.28455 20.6662 0.612607 19.6959 0.612607 18.1482L0.612607 2.86648C0.612607 1.3188 2.28454 0.348483 3.62835 1.11629L17.0013 8.75715Z" fill="#3A81EC"/>
        </svg>
      </div>
      <div>
        <h1 className="text-xl font-bold">Tour</h1>
        <p className="text-sm text-gray-500">Every great business deserves a great tour. Build yours today.</p>
      </div>
    </div>
    <div className="flex items-center">
      <div className="mr-8">
        <p className="text-sm font-semibold">Business</p>
        <ul className="text-xs text-gray-600">
          <li>Terms and conditions</li>
          <li>Privacy Policy</li>
          <li>Contact</li>
        </ul>
      </div>
      <div>
        <p className="text-sm font-semibold flex items-center">
          <span className="mr-1">☀️</span> Support
        </p>
        <p className="text-xs text-gray-600">+1 (584) 258-8588</p>
      </div>
    </div>
  </header>
  <hr className="my-4" />
  <footer className="flex text-sm text-gray-500 mb-5">
    <a href="#" className="mr-4">Terms of Service</a>
    <a href="#">Privacy</a>
  </footer>
</div>
    </div>
  )
}
// This ensures that the page is rendered on the server side
// export async function getServerSideProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }
