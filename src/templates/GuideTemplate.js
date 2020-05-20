import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Container from '../components/Container';

import createBreadcrumbs from '../utils/create-breadcrumbs';
import pages from '../data/sidenav.json';

const GuideTemplate = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  const crumbs = createBreadcrumbs(frontmatter.path, pages);

  return (
    <Layout>
      <BreadcrumbBar crumbs={crumbs} duration={frontmatter.duration} />
      <Container>
        <div className="guideTemplate-container">
          <div>
            <h1>{frontmatter.title}</h1>
            <div
              className="guideTemplate-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

GuideTemplate.propTypes = {
  data: PropTypes.object,
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        duration
        path
        title
      }
    }
  }
`;

export default GuideTemplate;