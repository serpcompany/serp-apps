<script setup lang="ts">
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
  Section,
} from '@vue-email/components'
import { env } from '@@/env'

interface LoginNotificationProps {
  userName: string
  email: string
  loginMethod?: string
  ipAddress?: string
  city?: string
  country?: string
  deviceType?: string
  loginTime?: string
}

withDefaults(defineProps<LoginNotificationProps>(), {
  userName: '',
  email: '',
  loginMethod: '',
  ipAddress: '',
  city: '',
  country: '',
  deviceType: '',
  loginTime: '',
  application: '',
})

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
}

const container = {
  margin: '0 auto',
  padding: '40px 24px',
  maxWidth: '600px',
}

const h1 = {
  color: '#111111',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 12px',
  padding: '0',
}

const subtitle = {
  color: '#444444',
  fontSize: '20px',
  fontWeight: 'normal',
  margin: '0 0 40px',
  padding: '0',
}

const detailSection = {
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '8px',
}

const detailLabel = {
  color: '#666666',
  fontSize: '14px',
  margin: '0',
}

const detailValue = {
  color: '#111111',
  fontSize: '16px',
  margin: '4px 0 0',
}

const footer = {
  color: '#666666',
  fontSize: '14px',
  marginTop: '40px',
  textAlign: 'left' as const,
}

const link = {
  color: '#006ADC',
  textDecoration: 'underline',
}
</script>

<template>
  <Html>
    <Head />
    <Preview>Recent login to your {{ env.APP_NAME }} account</Preview>
    <Body :style="main">
      <Container :style="container">
        <Heading :style="h1"
          >Recent login to your {{ env.APP_NAME }} account</Heading
        >
        <Text :style="subtitle">
          There was a recent login to your {{ env.APP_NAME }} account. Please
          review the details:
        </Text>

        <Section v-if="loginMethod" :style="detailSection">
          <Text :style="detailLabel">Login method</Text>
          <Text :style="detailValue">{{ loginMethod }}</Text>
        </Section>

        <Section v-if="city && country" :style="detailSection">
          <Text :style="detailLabel">Approximate location</Text>
          <Text :style="detailValue">{{ city }}, {{ country }}</Text>
        </Section>

        <Text :style="footer">
          If this was not you,
          <Link :style="link" :href="`${env.BASE_URL}/settings/security`"
            >reset your password now</Link
          >
          to protect your account and enroll in multi-factor authentication in
          the "My Account" tab of "Settings".
        </Text>
      </Container>
    </Body>
  </Html>
</template>
