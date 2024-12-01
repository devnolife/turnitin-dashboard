'use client'

import { useState } from 'react'

import Link from 'next/link'

import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import classnames from 'classnames'

import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 600,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 345,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const Register = ({ mode }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
const [whatsapp, setWhatsapp] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [whatsappError, setWhatsappError] = useState('')
  const [loading, setLoading] = useState(false)

  const darkIllustration = '/images/illustrations/auth/v2-register-dark.png'
  const lightIllustration = '/images/illustrations/auth/register-v3.svg'

  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const validateUsername = (value) => {
    const usernamePattern = /^[^\s]{7,}$/

    if (!usernamePattern.test(value)) {
      setUsernameError('Username tidak boleh mengandung spasi dan minimal 7 karakter')
    } else {
      setUsernameError('')
    }
  }

  const validatePassword = (value) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    if (!passwordPattern.test(value)) {
      setPasswordError('Password harus mengandung huruf besar, huruf kecil, dan angka serta minimal 8 karakter')
    } else {
      setPasswordError('')
    }
  }

  const validateWhatsapp = (value) => {
    const whatsappPattern = /^\d{10,}$/

    if (!whatsappPattern.test(value)) {
      setWhatsappError('Nomor WhatsApp harus minimal 10 karakter')
    } else {
      setWhatsappError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    validateUsername(username)
    validatePassword(password)
    validateWhatsapp(whatsapp)

    if (!usernameError && !passwordError && !whatsappError) {
      setLoading(true)

      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nim: username,
            password: password,
            no_whatsapp: whatsapp
          })
        })

        if (res.ok) {
          console.log('User berhasil terdaftar')
        } else {
          console.error('Terjadi kesalahan saat mendaftar')
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className='flex justify-center bs-full'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <RegisterIllustration src={characterIllustration} alt='ilustrasi-karakter' />
        {!hidden && <MaskImg alt='mask' src={authBackground} />}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link href="/" className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </Link>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-8 sm:mbs-11 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>Petualangan dimulai di sini 🚀</Typography>
            <Typography>Bikin manajemen aplikasi kamu jadi mudah dan seru!</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <CustomTextField
              autoFocus
              fullWidth
              label='Username'
              placeholder='Masukkan username kamu'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                validateUsername(e.target.value)
              }}
              error={!!usernameError}
              helperText={usernameError}
            />
            <CustomTextField
              fullWidth
              label='Password'
              placeholder='············'
              type={isPasswordShown ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                validatePassword(e.target.value)
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={!!passwordError}
              helperText={passwordError}
            />
            <CustomTextField
              fullWidth
              label='No WhatsApp'
              placeholder='Masukkan nomor WhatsApp kamu'
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value)
                validateWhatsapp(e.target.value)
              }}
              error={!!whatsappError}
              helperText={whatsappError}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={
                <>
                  <span>Saya setuju dengan </span>
                  <Link href="/" className='text-primary'>
                    kebijakan privasi & syarat
                  </Link>
                </>
              }
            />
            <Button fullWidth variant='contained' type='submit' disabled={loading}>
              {loading ? 'Mendaftar...' : 'Daftar'}
            </Button>
            <div className='flex flex-wrap items-center justify-center gap-2'>
              <Typography>Sudah punya akun?</Typography>
              <Typography color='primary'>
                Masuk aja
              </Typography>
            </div>
            <Divider className='gap-2'>created by devnolife</Divider>
            <div className='flex justify-center items-center gap-1.5'>
              <IconButton className='text-facebook' size='small'>
                <i className='tabler-brand-facebook-filled' />
              </IconButton>
              <IconButton className='text-twitter' size='small'>
                <i className='tabler-brand-twitter-filled' />
              </IconButton>
              <IconButton className='text-textPrimary' size='small'>
                <i className='tabler-brand-github-filled' />
              </IconButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
