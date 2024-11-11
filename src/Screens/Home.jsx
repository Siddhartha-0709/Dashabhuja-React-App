/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import sos from '../assets/sos.png';
import yoga from '../assets/yoga.png';
import map1 from '../assets/map1.png';
import reporting from '../assets/reporting.png';
export default function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row items-center justify-between mb-16">
        <div className="text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-6xl md:text-8xl font-bold mb-4" style={{ fontFamily: 'Samkaran', color: '#FF4545' }}>
            Dashabhuja
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-2" style={{ fontFamily: 'Ubuntu' }}>
            Ten Arms of Protection, One Powerful App
          </h2>
          <p className="text-xl text-gray-600" style={{ fontFamily: 'Ubuntu', fontWeight: '300' }}>
            Inspired by the Divine Strength of Maa Durga
          </p>
          <button className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Download Now</button>
        </div>
        <div className="w-full md:w-1/2 h-96">
          <iframe
            className="w-full h-full"
            src="https://lottie.host/embed/33adc41c-4b9d-4e82-b9bc-3eb6234d192a/4oxDM3fuIm.json"
            title="animation"
          ></iframe>
        </div>
      </header>

      <section className="grid md:grid-cols-2 gap-12 mb-16">
        <FeatureCard
          title="Emergency SOS"
          description="Activate the Emergency SOS feature to instantly share your live location with trusted contacts, trigger an automatic call and SMS alert, and ensure immediate assistance at the push of a button!"
          imageSrc={sos} // Use a local or public image URL
        />
        <FeatureCard
          title="Yoga AI"
          description="Enhance your physical fitness and wellness with Yoga feature. Discover a range of yoga poses, meditation techniques, and guided breathing exercises to enhance your physical and mental well-being."
          imageSrc={yoga}
        />
        <FeatureCard
          title="Live Footprints"
          description="The app offers a unique live footprints feature that allows you to track your location as you visit various places. It logs the exact timestamps of your visits, enabling you to share this information with your contacts as a link, ensuring that your loved ones are always informed of your whereabouts."
          imageSrc={map1}
        />
        <FeatureCard
          title="Crime Reporting"
          description="Anonymously report crimes with our app. Our app ensures your safety and security. It's a platform where you can report any crime that you have faced or witnessed, and we will make sure that the authorities are informed and the necessary steps are taken."
          imageSrc={reporting}
        />
      </section>

      <section className="grid md:grid-cols-2 gap-12">
        <Card title="About Dashabhuja">
          <p className="text-gray-600" style={{ fontFamily: 'Ubuntu', fontWeight: '300' }}>
            Dashabhuja is a women's safety and empowerment app inspired by the goddess Durga. It offers emergency SOS,
            alert notifications for trusted contacts, anonymous crime reporting, and a community space for women to
            share stories. With features like live location sharing and self-defense resources, Dashabhuja promotes
            safety and empowerment.
          </p>
        </Card>
        <Card title="Get the App">
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-4" style={{ fontFamily: 'Ubuntu', fontWeight: '300' }}>
              Scan the QR code below to download the app:
            </p>
            <img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              alt="Google Play Store Badge"
              width={200}
              height={60}
            />
          </div>
        </Card>
      </section>
    </div>
  );
}

function FeatureCard({ title, description, imageSrc }) {
  return (
    <div className="overflow-hidden border rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 md:w-1/2">
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="text-gray-600" style={{ fontFamily: 'Ubuntu', fontWeight: '300' }}>
            {description}
          </p>
        </div>
        <div className="md:w-1/2">
          <img src={imageSrc} alt={title} className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="border rounded-lg shadow-md">
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}
