import {
  Body,
  Button,
  Container,
  Heading,
  Hr,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

type EmailTemplateProps = {
  name?: string;
  redirectUrl?: string;
  linkText: string;
};

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name = '',
  redirectUrl = '/login',
  linkText,
}) => (
  <Html>
    <Head />
    <Preview>FarmConnect Email Verification</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={coverSection}>
          <Section style={imageSection}>
            <Img
              src={`${baseUrl}/static/farmconnect-logo.png`}
              width="75"
              height="45"
              alt="FarmConnect Logo"
            />
          </Section>
          <Section style={upperSection}>
            <Heading style={h1}>Verify your email address</Heading>
            <Text style={mainText}>
              Hi {name}, thank you for signing up with FarmConnect! To complete
              your account setup, please click the button below to verify your
              email address.
            </Text>
            <Section style={{ textAlign: 'center', margin: '20px 0' }}>
              <Button
                href={`${baseUrl}/${redirectUrl}`}
                style={{
                  backgroundColor: '#2754C5',
                  color: '#fff',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  borderRadius: '5px',
                }}
              >
                {linkText}
              </Button>
            </Section>
          </Section>
          <Hr />
          <Section style={lowerSection}>
            <Text style={cautionText}>
              FarmConnect will never email you to ask for sensitive information
              like your password or banking details.
            </Text>
          </Section>
        </Section>
        <Text style={footerText}>
          This message was produced and distributed by FarmConnect. © 2024,
          FarmConnect. All rights reserved. View our{' '}
          <Link
            href="https://farmconnect.com/privacy"
            target="_blank"
            style={link}
          >
            privacy policy
          </Link>
          .
        </Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

const main = {
  backgroundColor: '#fff',
  color: '#212121',
};

const container = {
  padding: '20px',
  margin: '0 auto',
  backgroundColor: '#eee',
};

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '15px',
};

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
};

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};

const imageSection = {
  backgroundColor: '#252f3d',
  display: 'flex',
  padding: '20px 0',
  alignItems: 'center',
  justifyContent: 'center',
};

const coverSection = { backgroundColor: '#fff' };

const upperSection = { padding: '25px 35px' };

const lowerSection = { padding: '25px 35px' };

const footerText = {
  ...text,
  fontSize: '12px',
  padding: '0 20px',
};

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: 'bold',
  textAlign: 'center' as const,
};

const codeText = {
  ...text,
  fontWeight: 'bold',
  fontSize: '36px',
  margin: '10px 0',
  textAlign: 'center' as const,
};

const validityText = {
  ...text,
  margin: '0px',
  textAlign: 'center' as const,
};

const verificationSection = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const mainText = { ...text, marginBottom: '14px' };

const cautionText = { ...text, margin: '0px' };
