
import NavigationBar from "@/components/NavigationBar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Job Board</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            Welcome to Job Board, your premier destination for finding the perfect career opportunity.
          </p>
          <p className="mb-4">
            Our platform connects talented professionals with leading companies across various industries. 
            Whether you're looking for your first job or making a strategic career move, we provide a 
            seamless experience to help you discover and apply to positions that match your skills and aspirations.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="mb-4">
            We believe in empowering job seekers with the tools and information they need to make informed career decisions. 
            Our mission is to simplify the job search process and create meaningful connections between employers and candidates.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="mb-4">
            Have questions or feedback? We'd love to hear from you! Reach out to our team at 
            <a href="mailto:support@jobboard.com" className="text-blue-600 hover:text-blue-800 ml-1">support@jobboard.com</a>.
          </p>
        </div>
      </main>
      <footer className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Job Board. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default About;