
import React from "react";
import { Job } from "@/services/jobService";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  onApply: (job: Job) => void;
}

const JobCard = ({ job, onViewDetails, onApply }: JobCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img 
            src={job.logo} 
            alt={`${job.company} logo`} 
            className="w-12 h-12 rounded" 
          />
          <div>
            <h3 
              className="text-lg font-semibold text-blue-700 hover:text-blue-800 cursor-pointer"
              onClick={() => onViewDetails(job)}
            >
              {job.title}
            </h3>
            <p className="text-gray-600">{job.company}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm text-gray-500 mb-1">Posted: {job.posted}</span>
          {job.applied && (
            <Badge variant="success" className="bg-green-500">Applied</Badge>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline" className="bg-gray-100">
            {job.location}
          </Badge>
          <Badge variant="outline" className="bg-gray-100">
            {job.type}
          </Badge>
          <Badge variant="outline" className="bg-gray-100">
            {job.experience} {job.experience === 1 ? "year" : "years"} exp
          </Badge>
          <Badge variant="outline" className="bg-gray-100">
            {job.salary}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {job.skills.slice(0, 5).map((skill) => (
            <Badge key={skill.id} variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
              {skill.name}
            </Badge>
          ))}
          {job.skills.length > 5 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
              +{job.skills.length - 5} more
            </Badge>
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button
          variant="outline"
          className="mr-2"
          onClick={() => onViewDetails(job)}
        >
          View Details
        </Button>
        <Button
          onClick={() => onApply(job)}
          disabled={job.applied}
        >
          {job.applied ? "Applied" : "Apply Now"}
        </Button>
      </div>
    </div>
  );
};

export default JobCard;