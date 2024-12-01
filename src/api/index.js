export const checkWhatsappNumber = async (number) => {
  try {
    const res = await fetch(`https://whatsapp.devnolife.site/check-number/${number}`)
  } catch (e) {
    return e
  }
}
