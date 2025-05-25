
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/services/jobService";

interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (job: Job) => void;
}

const JobDetailsModal = ({ job, isOpen, onClose, onApply }: JobDetailsModalProps) => {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center mb-4">
            <img 
              src={job.logo} 
              alt={`${job.company} logo`} 
              className="w-16 h-16 rounded mr-4" 
            />
            <div>
              <DialogTitle className="text-xl font-semibold">{job.title}</DialogTitle>
              <p className="text-gray-600">{job.company}</p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium">{job.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Job Type</p>
            <p className="font-medium">{job.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Experience</p>
            <p className="font-medium">{job.experience} {job.experience === 1 ? "year" : "years"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Salary</p>
            <p className="font-medium">{job.salary}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Skills Required</p>
          <div className="flex flex-wrap gap-1">
            {job.skills.map((skill) => (
              <Badge key={skill.id} variant="secondary" className="bg-blue-100 text-blue-800">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Job Description</p>
          <div className="whitespace-pre-line text-gray-800">{job.description}</div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            Close
          </Button>
          <Button onClick={() => onApply(job)} disabled={job.applied}>
            {job.applied ? "Applied" : "Apply Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsModal;