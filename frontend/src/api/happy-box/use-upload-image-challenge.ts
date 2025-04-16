import { useFrappeFileUpload, useFrappePostCall } from 'frappe-react-sdk'
import React from 'react'
import { FRAPPE_APIS } from '@happy-box/api/api.config'
import { useAuthWSCode } from '@/lib/auth/auth-ws-code/use-auth-ws-code'


export default function useUploadImageChallenge() {
    const {user} = useAuthWSCode()
    const {call } = useFrappePostCall(FRAPPE_APIS.CREATE_HB_SUBMISSION.METHOD_STRING)
    const {upload, isCompleted } = useFrappeFileUpload()
    const handleUpload = async (challlenge_id: string, file: File | Blob) => {
   
        const res = await call({
            "wellspring_code": user?.userData.wellspringCode,
            "user_type": user?.userType,
            "full_name": user?.userData.fullName,
            "happy_box_challenge": challlenge_id
        })

        const submission_id = res.message.name

        let fileToUpload: File;
        
        if (file instanceof Blob && !(file instanceof File)) {
            fileToUpload = new File([file], `challenge_image_${submission_id}_${new Date().getTime()}.jpg`, { type: file.type });
        } else {
            fileToUpload = file as File;
        }

        await upload(
            fileToUpload,
            {
              isPrivate: true,
              otherData: {
                submission_id,
              },
            },
            FRAPPE_APIS.UPLOAD_HB_SUBMISSION_PHOTO.METHOD_STRING,
          )
    }
  return {handleUpload,isCompleted}
}
