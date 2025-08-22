import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Brain, 
  Shield, 
  Zap, 
  Code, 
  TestTube, 
  Rocket, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Reveal, RevealWrapper } from '@/components/Reveal';
import AIIntegrationService, { 
  AIContractOptimizer, 
  StellaAIAssistant, 
  AIContractMonitor 
} from '@/services/AIIntegrationService';

/**
 * AI Integration Showcase Page
 * Demonstrates the use of AI tools as required by the Soroban hackathon:
 * - OpenZeppelin AI Wizard integration
 * - Stella Discord AI assistance
 * - AI-powered contract optimization
 */
export default function AIIntegration() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [contractHealth, setContractHealth] = useState<any>(null);

  useEffect(() => {
    loadAIAnalysis();
    loadContractHealth();
  }, []);

  const loadAIAnalysis = async () => {
    setLoading(true);
    try {
      const fullAnalysis = await AIIntegrationService.getFullAnalysis();
      setAnalysis(fullAnalysis);
    } catch (error) {
      console.error('Error loading AI analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadContractHealth = async () => {
    try {
      const health = await AIContractMonitor.monitorContractHealth("test-contract");
      setContractHealth(health);
    } catch (error) {
      console.error('Error loading contract health:', error);
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'bg-green-100 text-green-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'HIGH': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'HEALTHY': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'WARNING': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'CRITICAL': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-background to-muted py-12">
      <RevealWrapper>
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <Reveal delay={0.2}>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Brain className="h-12 w-12 text-primary mr-3" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AI Integration Showcase
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Demonstrating the power of AI tools in building equitable finance solutions on Soroban.
                Built with OpenZeppelin AI Wizard patterns and Stella Discord AI assistance.
              </p>
            </div>
          </Reveal>

          {/* AI Tools Overview */}
          <Reveal delay={0.4}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  AI Tools Integration
                </CardTitle>
                <CardDescription>
                  This project demonstrates integration with the required AI tools for the Soroban hackathon
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Code className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold">OpenZeppelin AI Wizard</h3>
                    <p className="text-sm text-muted-foreground">
                      AI-generated contract patterns and security best practices
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Brain className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-semibold">Stella Discord AI</h3>
                    <p className="text-sm text-muted-foreground">
                      AI assistance for development, testing, and deployment
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <h3 className="font-semibold">AI Optimization</h3>
                    <p className="text-sm text-muted-foreground">
                      Gas optimization and performance insights
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Main Content Tabs */}
          <Reveal delay={0.6}>
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="optimization">Optimization</TabsTrigger>
                <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              </TabsList>

              {/* AI Analysis Tab */}
              <TabsContent value="analysis">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="h-5 w-5 mr-2" />
                      AI Contract Analysis
                    </CardTitle>
                    <CardDescription>
                      Comprehensive analysis generated using AI tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-2">Analyzing contract with AI...</p>
                      </div>
                    ) : analysis ? (
                      <div className="space-y-6">
                        {/* Contract Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Contract Type</h4>
                            <p className="text-muted-foreground">{analysis.contractAnalysis.contractType}</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Risk Level</h4>
                            <Badge className={getRiskLevelColor(analysis.contractAnalysis.riskLevel)}>
                              {analysis.contractAnalysis.riskLevel}
                            </Badge>
                          </div>
                        </div>

                        {/* Gas Estimates */}
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-3">Gas Estimates</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(analysis.contractAnalysis.gasEstimates).map(([operation, gas]) => (
                              <div key={operation} className="text-center">
                                <p className="text-sm text-muted-foreground capitalize">
                                  {operation.replace(/([A-Z])/g, ' $1').trim()}
                                </p>
                                <p className="font-mono font-semibold">{gas.toLocaleString()}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Vulnerabilities & Best Practices */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2 text-red-600">Vulnerabilities</h4>
                            <ul className="space-y-1">
                              {analysis.contractAnalysis.vulnerabilities.map((vuln: string, index: number) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-start">
                                  <AlertTriangle className="h-3 w-3 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                                  {vuln}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2 text-green-600">Best Practices</h4>
                            <ul className="space-y-1">
                              {analysis.contractAnalysis.bestPractices.map((practice: string, index: number) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-start">
                                  <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                                  {practice}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Alert>
                        <AlertDescription>
                          Failed to load AI analysis. Please try again.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      AI Security Recommendations
                    </CardTitle>
                    <CardDescription>
                      Security insights and recommendations from AI analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {AIContractOptimizer.getSecurityRecommendations().map((recommendation, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-start">
                            <Shield className="h-5 w-5 mr-3 mt-0.5 text-blue-600 flex-shrink-0" />
                            <p className="text-sm">{recommendation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Optimization Tab */}
              <TabsContent value="optimization">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-5 w-5 mr-2" />
                      AI Gas Optimization
                    </CardTitle>
                    <CardDescription>
                      Gas optimization tips and strategies from AI analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {AIContractOptimizer.getGasOptimizationTips().map((tip, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-start">
                            <Zap className="h-5 w-5 mr-3 mt-0.5 text-yellow-600 flex-shrink-0" />
                            <p className="text-sm">{tip}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Monitoring Tab */}
              <TabsContent value="monitoring">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      AI Contract Monitoring
                    </CardTitle>
                    <CardDescription>
                      Real-time monitoring and insights from AI analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {contractHealth ? (
                      <div className="space-y-6">
                        {/* Contract Health Status */}
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center mb-2">
                            {getStatusIcon(contractHealth.status)}
                            <h4 className="font-semibold ml-2">Contract Health</h4>
                          </div>
                          <Badge className={getRiskLevelColor(contractHealth.status)}>
                            {contractHealth.status}
                          </Badge>
                        </div>

                        {/* Performance Insights */}
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-3">AI Performance Insights</h4>
                          <div className="space-y-2">
                            {AIContractMonitor.getPerformanceInsights().map((insight, index) => (
                              <div key={index} className="text-sm text-muted-foreground flex items-start">
                                <Info className="h-3 w-3 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                                {insight}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Recommendations */}
                        {contractHealth.recommendations.length > 0 && (
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-3">AI Recommendations</h4>
                            <div className="space-y-2">
                              {contractHealth.recommendations.map((rec: string, index: number) => (
                                <div key={index} className="text-sm text-muted-foreground flex items-start">
                                  <Brain className="h-3 w-3 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                                  {rec}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-2">Loading contract health data...</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Reveal>

          {/* AI Development Assistance */}
          <Reveal delay={0.8}>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  AI Development Assistance
                </CardTitle>
                <CardDescription>
                  Development suggestions and strategies from Stella Discord AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Vault Creation */}
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3 text-blue-600">Vault Creation</h4>
                    <ul className="space-y-2 text-sm">
                      {StellaAIAssistant.getDevelopmentSuggestions("vault_creation").map((suggestion, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Testing Strategies */}
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3 text-green-600">Testing Strategies</h4>
                    <ul className="space-y-2 text-sm">
                      {StellaAIAssistant.getTestingStrategies().map((strategy, index) => (
                        <li key={index} className="flex items-start">
                          <TestTube className="h-3 w-3 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deployment */}
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3 text-purple-600">Deployment</h4>
                    <ul className="space-y-2 text-sm">
                      {StellaAIAssistant.getDeploymentRecommendations().map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <Rocket className="h-3 w-3 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Footer */}
          <Reveal delay={1.0}>
            <div className="text-center mt-12 p-6 border rounded-lg bg-muted/50">
              <h3 className="text-lg font-semibold mb-2">AI-Powered Development</h3>
              <p className="text-muted-foreground mb-4">
                This project demonstrates the power of AI tools in building secure, efficient, and equitable finance solutions.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Brain className="h-4 w-4 mr-1" />
                  OpenZeppelin AI Wizard
                </span>
                <span className="flex items-center">
                  <Code className="h-4 w-4 mr-1" />
                  Stella Discord AI
                </span>
                <span className="flex items-center">
                  <Zap className="h-4 w-4 mr-1" />
                  AI Optimization
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </RevealWrapper>
    </div>
  );
}
