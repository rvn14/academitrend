import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

interface Prediction {
  applications_pred: number;
  course_name: string;
  enrollments_pred: number;
  model: string;
  university: string;
  year: number;
}

interface EnrollmentData {
  description: string;
  message: string;
  models_used: string[];
  predictions: Prediction[];
}

const EnrollmentPage = async  ({ params }: PageProps) => {
  const { id } = await params;

  try {
    const response = await fetch(`http://localhost:5050/api/course-enrollment-prediction`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch enrollment data");
    }
    
    const data: EnrollmentData = await response.json();
    
    
    const universityMapping: Record<string, string[]> = {
      'colombo': ['University of Colombo'],
      'peradeniya': ['University of Peradeniya'],
      'moratuwa': ['University of Moratuwa'],
      'sri-jayewardenepura': ['University of Sri Jayewardenepura'],
      'kelaniya': ['University of Kelaniya'],
      'rajarata': ['Rajarata University of Sri Lanka'],
      'eastern': ['Eastern University of Sri Lanka', 'Eastern University - Trincomalee Campus'],
      'wayamba': ['Wayamba University of Sri Lanka'],
      'sabaragamuwa': ['Sabaragamuwa University of Sri Lanka'],
      'southeastern': ['South Eastern University of Sri Lanka'],
      'uva-wellassa': ['Uva Wellassa University'],
      'open': ['Open University of Sri Lanka']
    };
    
    
    const universityNames = universityMapping[id] || [];
    const universityPredictions = data.predictions.filter(prediction => {
      // Check if prediction university matches any of the mapped university names
      const matchesUniversity = universityNames.some(name => 
        prediction.university.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(prediction.university.toLowerCase())
      ) || 
      // Fallback to original logic if no mapping found
      (universityNames.length === 0 && (
        prediction.university.toLowerCase().includes(id.toLowerCase()) ||
        prediction.university.toLowerCase().replace(/[^a-z0-9]/g, '').includes(id.toLowerCase())
      ));
      
      // Filter out zero enrollments - only show meaningful predictions
      return matchesUniversity && prediction.enrollments_pred > 0;
    });

    // Group predictions by course and year for better organization
    const courseGroups = universityPredictions.reduce((acc, prediction) => {
      const key = prediction.course_name;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(prediction);
      return acc;
    }, {} as Record<string, Prediction[]>);

    // Get unique years for timeline
    const years = [...new Set(universityPredictions.map(p => p.year))].sort();
    
    // Get university name - prefer mapped name, fallback to prediction data
    const universityDisplayNames: Record<string, string> = {
      'colombo': 'University of Colombo',
      'peradeniya': 'University of Peradeniya', 
      'moratuwa': 'University of Moratuwa',
      'sri-jayewardenepura': 'University of Sri Jayewardenepura',
      'kelaniya': 'University of Kelaniya',
      'rajarata': 'Rajarata University of Sri Lanka',
      'eastern': 'Eastern University of Sri Lanka',
      'wayamba': 'Wayamba University of Sri Lanka',
      'sabaragamuwa': 'Sabaragamuwa University of Sri Lanka',
      'southeastern': 'South Eastern University of Sri Lanka',
      'uva-wellassa': 'Uva Wellassa University',
      'open': 'Open University of Sri Lanka'
    };
    
    const universityName = universityDisplayNames[id] || 
                          universityPredictions[0]?.university || 
                          `University (ID: ${id})`;

    if (universityPredictions.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>No Enrollment Predictions Found</CardTitle>
              <CardDescription>
                No enrollment predictions available for university ID: {id}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{universityName}</h1>
          <p className="text-muted-foreground">Course Enrollment Predictions</p>
          <div className="flex flex-wrap gap-2">
            {data.models_used.map((model) => (
              <Badge key={model} variant="secondary">
                {model.replace('_', ' ').toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(courseGroups).length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Prediction Years</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{years.length}</div>
              <p className="text-xs text-muted-foreground">
                {Math.min(...years)} - {Math.max(...years)}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Annual Enrollment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  universityPredictions.reduce((sum, p) => sum + p.enrollments_pred, 0) / 
                  universityPredictions.length
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Annual Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  universityPredictions.reduce((sum, p) => sum + p.applications_pred, 0) / 
                  universityPredictions.length
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course-wise Predictions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Course-wise Enrollment & Application Predictions</h2>
          
          {Object.entries(courseGroups).map(([courseName, predictions]) => (
            <Card key={courseName}>
              <CardHeader>
                <CardTitle className="text-xl">{courseName}</CardTitle>
                <CardDescription>
                  Enrollment and application predictions across {predictions.length} years
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Year-wise table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Year</th>
                          <th className="text-right py-2">Predicted Applications</th>
                          <th className="text-right py-2">Predicted Enrollments</th>
                          <th className="text-center py-2">Acceptance Rate</th>
                          <th className="text-center py-2">Model</th>
                        </tr>
                      </thead>
                      <tbody>
                        {predictions
                          .sort((a, b) => a.year - b.year)
                          .map((prediction, index) => {
                            const acceptanceRate = prediction.applications_pred > 0 
                              ? ((prediction.enrollments_pred / prediction.applications_pred) * 100)
                              : 0;
                            
                            return (
                              <tr key={index} className="border-b last:border-b-0">
                                <td className="py-2 font-medium">{prediction.year}</td>
                                <td className="text-right py-2">
                                  <span className="font-semibold text-green-600">
                                    {Math.round(prediction.applications_pred)}
                                  </span>
                                </td>
                                <td className="text-right py-2">
                                  <span className="font-semibold text-blue-600">
                                    {Math.round(prediction.enrollments_pred)}
                                  </span>
                                </td>
                                <td className="text-center py-2">
                                  <span className="text-sm font-medium">
                                    {acceptanceRate.toFixed(1)}%
                                  </span>
                                </td>
                                <td className="text-center py-2">
                                  <Badge variant="outline" className="text-xs">
                                    {prediction.model.replace('_', ' ')}
                                  </Badge>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>

                  {/* Simple trend indicator */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Trends Analysis</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium mb-2 text-blue-600">Enrollments</h5>
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="text-muted-foreground">2024: </span>
                            <span className="font-semibold">
                              {Math.round(predictions.find(p => p.year === 2024)?.enrollments_pred || 0)}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">2030: </span>
                            <span className="font-semibold">
                              {Math.round(predictions.find(p => p.year === 2030)?.enrollments_pred || 0)}
                            </span>
                          </div>
                          <div className="ml-auto">
                            {(() => {
                              const start = predictions.find(p => p.year === 2024)?.enrollments_pred || 0;
                              const end = predictions.find(p => p.year === 2030)?.enrollments_pred || 0;
                              const trend = end > start ? 'Increasing' : end < start ? 'Decreasing' : 'Stable';
                              const color = trend === 'Increasing' ? 'text-green-600' : 
                                           trend === 'Decreasing' ? 'text-red-600' : 'text-gray-600';
                              return <span className={`font-medium ${color}`}>{trend}</span>;
                            })()}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2 text-green-600">Applications</h5>
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="text-muted-foreground">2024: </span>
                            <span className="font-semibold">
                              {Math.round(predictions.find(p => p.year === 2024)?.applications_pred || 0)}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">2030: </span>
                            <span className="font-semibold">
                              {Math.round(predictions.find(p => p.year === 2030)?.applications_pred || 0)}
                            </span>
                          </div>
                          <div className="ml-auto">
                            {(() => {
                              const start = predictions.find(p => p.year === 2024)?.applications_pred || 0;
                              const end = predictions.find(p => p.year === 2030)?.applications_pred || 0;
                              const trend = end > start ? 'Increasing' : end < start ? 'Decreasing' : 'Stable';
                              const color = trend === 'Increasing' ? 'text-green-600' : 
                                           trend === 'Decreasing' ? 'text-red-600' : 'text-gray-600';
                              return <span className={`font-medium ${color}`}>{trend}</span>;
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Key insights from enrollment and application predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>Total predicted applications for 2024:</strong>{' '}
                    {universityPredictions
                      .filter(p => p.year === 2024)
                      .reduce((sum, p) => sum + p.applications_pred, 0)
                      .toFixed(0)} applications
                  </p>
                  <p>
                    <strong>Total predicted enrollments for 2024:</strong>{' '}
                    {universityPredictions
                      .filter(p => p.year === 2024)
                      .reduce((sum, p) => sum + p.enrollments_pred, 0)
                      .toFixed(0)} students
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Overall acceptance rate (2024):</strong>{' '}
                    {(() => {
                      const totalApps = universityPredictions
                        .filter(p => p.year === 2024)
                        .reduce((sum, p) => sum + p.applications_pred, 0);
                      const totalEnrolls = universityPredictions
                        .filter(p => p.year === 2024)
                        .reduce((sum, p) => sum + p.enrollments_pred, 0);
                      return totalApps > 0 ? ((totalEnrolls / totalApps) * 100).toFixed(1) + '%' : 'N/A';
                    })()}
                  </p>
                  <p>
                    <strong>Most popular course:</strong>{' '}
                    {Object.entries(courseGroups)
                      .map(([course, preds]) => ({
                        course,
                        avgApps: preds.reduce((sum, p) => sum + p.applications_pred, 0) / preds.length
                      }))
                      .sort((a, b) => b.avgApps - a.avgApps)[0]?.course || 'N/A'}
                  </p>
                </div>
              </div>
              <p>
                <strong>Prediction models used:</strong> {data.models_used.length} different ML models
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
    
  } catch (error) {
    console.error("Error fetching enrollment data:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Data</CardTitle>
            <CardDescription>
              Failed to load enrollment predictions. Please try again later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Error details: {error instanceof Error ? error.message : 'Unknown error'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default EnrollmentPage