import { Client, Storage } from 'appwrite'

const fileUpload =  async ({ file }) => {
  const projectID = '6680176400125336f7f9'
  const bucketID = '668017b400180c09e0b9'
  const endpoint = 'https://cloud.appwrite.io/v1'

  const client = new Client().setEndpoint(endpoint).setProject(projectID)

  const storage = new Storage(client)

  //const uploadPromise = storage.createFile(bucketID, 'unique()', file)

  return storage.createFile(bucketID, 'unique()', file).then(
    (response) => {
      const url = `${endpoint}/storage/buckets/${bucketID}/files/${response.$id}/view?project=${projectID}`
      console.log(url);
      return url
    },
    (error) => {
      console.log(error)
    }
  )
}

export default fileUpload
