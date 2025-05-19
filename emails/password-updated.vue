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

interface PasswordUpdatedProps {
  userName?: string
  updatedAt?: string
}

withDefaults(defineProps<PasswordUpdatedProps>(), {
  userName: '',
  updatedAt: '',
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
</script>

<template>
  <Html>
    <Head />
    <Preview>Your password has been updated</Preview>
    <Body :style="main">
      <Container :style="container">
        <Heading :style="h1">Your password has been updated</Heading>
        <Text :style="text"> Hello {{ userName }}, </Text>
        <Text :style="text">
          Your {{ env.APP_NAME }} account password has been successfully updated.
        </Text>
        <Text v-if="updatedAt" :style="text">
          Time: {{ updatedAt }}
        </Text>
        <Text :style="text">
          If you made this change, you don't need to take any action.
        </Text>
        <Text :style="text">
          If you didn't change your password, please
          <Link :href="`${env.BASE_URL}/reset-password`" target="_blank" :style="link">
            reset your password immediately
          </Link>
          and contact our support team.
        </Text>
        <Text :style="text">
          Thanks,<br>
          {{ env.APP_NAME }} team
        </Text>
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