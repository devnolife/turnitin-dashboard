// Next Imports
import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const { nim, password, no_whatsapp } = await req.json()

    const checkUser = await prisma.users.findUnique({
      where: {
        username: nim
      },
    })

    if (checkUser) {
      return NextResponse.json({ error: 'User sudah terdaftar' }, { status: 400 })
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await prisma.users.create({
      data: {
        username: nim,
        password: hash,
        role: 'mahasiswa',
        no_whatsapp: no_whatsapp
      },
    })

    return NextResponse.json({ message: 'User berhasil terdaftar' }, { status: 200 })
  } catch (e) {

    return NextResponse.json({ error: e, message: e?.message || e }, { status: 500 })
  }

}
