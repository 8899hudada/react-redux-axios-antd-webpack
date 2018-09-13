import { getPathFromUrl } from '@utils'

const formatAttachments = (imgs, originAttachments, fileProperty, caseId) => {
  return imgs.map(item => {
    const isOrigin = originAttachments.find(originItem => originItem.fileUrl === item)
    return {
      filePath: getPathFromUrl(item),
      fileProperty,
      caseId,
      id: isOrigin ? isOrigin.id : null
    }
  })
}

export {
  formatAttachments
}