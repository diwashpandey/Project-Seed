import FormFoundation from "../../FormFoundations/FormFoundation"

function EmailForm({formTitle, description}) {
  return (
    <FormFoundation formTitle={formTitle} description={description}>
        {/* Main Form */}
        <form action="" className="flex flex-col">
            <input type="email"
            placeholder="Email"
            className="bg-theme-lighter h-12 w-full mb-5 p-4 rounded-2xl font-light placeholder:font-extralight focus-visible:outline-none"/>

            <button type="submit" className="btn-white-filled absolute bottom-3 right-3">Save</button>
        </form>
    </FormFoundation>
  )
}

export default EmailForm