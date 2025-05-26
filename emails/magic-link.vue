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
} from '@vue-email/components'
import { env } from '@@/env'

interface EmailVerificationProps {
  otp?: string
  verificationCode?: string
  userName?: string
}

withDefaults(defineProps<EmailVerificationProps>(), {
  otp: '',
  verificationCode: '',
  userName: '',
})

const main = {
  backgroundColor: '#ffffff',
}

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
}

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
}

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
}

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
}

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
}

const code = {
  display: 'inline-block',
  padding: '16px 4.5%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
}
</script>

<template>
  <Html>
    <Head />
    <Preview>Your login link</Preview>
    <Body :style="main">
      <Container :style="container">
        <Heading :style="h1"> Your login link </Heading>
        <Text :style="{ ...text, marginBottom: '14px' }">
          Hi {{ userName || 'there' }},
        </Text>
        <Text :style="{ ...text, marginBottom: '14px' }">
          Here's your login code for {{ env.APP_NAME }}:
        </Text>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 4px; text-align: center; margin: 20px 0;">
          {{ otp }}
        </div>
        <Text :style="{ ...text, marginBottom: '14px' }">
          This code will expire in 15 minutes.
        </Text>
        <Text
          :style="{
            ...text,
            color: '#ababab',
            marginTop: '14px',
            marginBottom: '16px',
          }"
        >
          If you didn't request this code, you can safely ignore this email.
        </Text>
        <Text
          :style="{
            ...text,
            color: '#ababab',
            marginTop: '12px',
            marginBottom: '38px',
          }"
        />
        <Img :src="env.LOGO_URL" width="32" alt="Logo" />
        <Text :style="footer">
          <Link
            :href="env.BASE_URL"
            target="_blank"
            :style="{ ...link, color: '#898989' }"
          >
            {{ env.APP_NAME }}
          </Link>, {{ env.APP_DESCRIPTION }}
        </Text>
      </Container>
    </Body>
  </Html>
</template>
