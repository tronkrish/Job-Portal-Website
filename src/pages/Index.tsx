
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import NavigationBar from "@/components/NavigationBar";
import JobCard from "@/components/JobCard";
import JobDetailsModal from "@/components/JobDetailsModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getJobs, getJobById, applyForJob, Job } from "@/services/jobService";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const pageSize = 10;
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle search input with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page on search
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = () => {
      const result = getJobs(currentPage, pageSize, debouncedSearchTerm);
      setJobs(result.jobs);
      setTotalJobs(result.total);
    };

    fetchJobs();
  }, [currentPage, pageSize, debouncedSearchTerm]);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApply = (job: Job) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to apply for this job",
        variant: "destructive",
      });
      navigate("/login", { state: { from: "/" } });
      return;
    }

    applyForJob(job.id);
    // Update jobs list to reflect the applied status
    setJobs(jobs.map(j => j.id === job.id ? { ...j, applied: true } : j));
    
    if (selectedJob && selectedJob.id === job.id) {
      setSelectedJob({ ...selectedJob, applied: true });
    }

    toast({
      title: "Application submitted",
      description: `You have successfully applied to ${job.title} at ${job.company}`,
    });
  };

  const totalPages = Math.ceil(totalJobs / pageSize);

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={currentPage === i} 
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              aria-disabled={currentPage === 1}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {pages}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              aria-disabled={currentPage === totalPages}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Find Your Dream Job</h1>
        <p className="text-lg mb-8">
          Browse through our extensive list of job opportunities and find the perfect match for your skills and experience.
        </p>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for jobs, companies, or skills..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">No jobs found</h2>
            <p>Try adjusting your search criteria</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 mb-8">
              {jobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onViewDetails={handleViewDetails}
                  onApply={handleApply}
                />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                {renderPagination()}
              </div>
            )}
          </>
        )}
      </main>
      
      <JobDetailsModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApply}
      />

      <footer className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Job Board. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;