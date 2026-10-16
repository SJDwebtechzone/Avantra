import React from 'react';
import { Route, Switch } from 'wouter';
import { HomePage } from './pages/HomePage';
import { ServicesIndexPage } from './pages/ServicesIndexPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { StoryPage } from './pages/StoryPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { ApproachPage } from './pages/ApproachPage';
import { PricingPage } from './pages/PricingPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { NewsPage } from './pages/NewsPage';
import { UpdatesPage } from './pages/UpdatesPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';

export const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/services" component={ServicesIndexPage} />
      <Route path="/services/:slug" component={ServiceDetailPage} />
      <Route path="/story" component={StoryPage} />
      <Route path="/our-story" component={StoryPage} />
      <Route path="/why-us" component={WhyUsPage} />
      <Route path="/approach" component={ApproachPage} />
      <Route path="/our-approach" component={ApproachPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/our-pricing" component={PricingPage} />
      <Route path="/get-started" component={GetStartedPage} />
      <Route path="/articles" component={ArticlesPage} />
      <Route path="/articles/:slug" component={ArticleDetailPage} />
      <Route path="/news" component={NewsPage} />
      <Route path="/updates" component={UpdatesPage} />
      <Route path="/case-studies" component={CaseStudiesPage} />
      <Route path="/insights" component={ArticlesPage} />
      {/* Fallback route */}
      <Route component={HomePage} />
    </Switch>
  );
};

export default App;
