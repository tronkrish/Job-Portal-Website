import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import NavigationBar from "@/components/NavigationBar";
import JobCard from "@/components/JobCard";
import JobDetailsModal from "@/components/JobDetailsModal";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getJobs, applyForJob } from "@/services/jobService";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const Index = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
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
    const handleViewDetails = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };
    const handleApply = (job) => {
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
            pages.push(_jsx(PaginationItem, { children: _jsx(PaginationLink, { isActive: currentPage === i, onClick: () => setCurrentPage(i), children: i }) }, i));
        }
        return (_jsx(Pagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { onClick: () => setCurrentPage(prev => Math.max(1, prev - 1)), "aria-disabled": currentPage === 1, className: currentPage === 1 ? "pointer-events-none opacity-50" : "" }) }), pages, _jsx(PaginationItem, { children: _jsx(PaginationNext, { onClick: () => setCurrentPage(prev => Math.min(totalPages, prev + 1)), "aria-disabled": currentPage === totalPages, className: currentPage === totalPages ? "pointer-events-none opacity-50" : "" }) })] }) }));
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(NavigationBar, {}), _jsxs("main", { className: "flex-1 container mx-auto px-4 py-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "Find Your Dream Job" }), _jsx("p", { className: "text-lg mb-8", children: "Browse through our extensive list of job opportunities and find the perfect match for your skills and experience." }), _jsx("div", { className: "mb-8", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }), _jsx(Input, { type: "text", placeholder: "Search for jobs, companies, or skills...", className: "pl-10", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }) }), jobs.length === 0 ? (_jsxs("div", { className: "bg-gray-100 p-8 rounded-lg text-center", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "No jobs found" }), _jsx("p", { children: "Try adjusting your search criteria" })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid grid-cols-1 gap-6 mb-8", children: jobs.map(job => (_jsx(JobCard, { job: job, onViewDetails: handleViewDetails, onApply: handleApply }, job.id))) }), totalPages > 1 && (_jsx("div", { className: "flex justify-center mt-8", children: renderPagination() }))] }))] }), _jsx(JobDetailsModal, { job: selectedJob, isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onApply: handleApply }), _jsx("footer", { className: "bg-gray-50 py-4", children: _jsxs("div", { className: "container mx-auto px-4 text-center text-gray-500 text-sm", children: ["\u00A9 ", new Date().getFullYear(), " Job Board. All rights reserved."] }) })] }));
};
export default Index;
