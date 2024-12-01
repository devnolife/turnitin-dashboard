'use client'

// Next Imports
import dynamic from 'next/dynamic'

//! To avoid 'Window is not defined' error
// eslint-disable-next-line import/no-unresolved
const ReactDraftWysiwyg = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), {
  ssr: false
})

export default ReactDraftWysiwyg
