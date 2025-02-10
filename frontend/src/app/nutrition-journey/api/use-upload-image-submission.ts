import { useFrappeFileUpload, useFrappePostCall } from 'frappe-react-sdk'
import React from 'react'
import { FRAPPE_APIS } from './api.config'

export default function useUploadImageSubmission() {
    const {call } = useFrappePostCall(FRAPPE_APIS.CREATE_NJ_SUBMISSION.METHOD_STRING)
    const {upload, isCompleted } = useFrappeFileUpload()

    const handleUpload = async (code: string,question_id:string,image_sequence_number: number, file: File | Blob) => {
   
        const res = await call({
            "wellspring_code": code
        })

        const submission_id = res.message.name

        let fileToUpload: File;
        
        if (file instanceof Blob && !(file instanceof File)) {
            fileToUpload = new File([file], `image_${question_id}_${image_sequence_number}.jpg`, { type: file.type });
        } else {
            fileToUpload = file as File;
        }

        await upload(
            fileToUpload,
            {
              isPrivate: true,
              otherData: {
                submission_id,
                question_id,
                image_sequence_number
              },
            },
            FRAPPE_APIS.UPLOAD_NJ_SUBMISSION_PHOTO.METHOD_STRING,
          )
    }
  return {handleUpload,isCompleted}
}
