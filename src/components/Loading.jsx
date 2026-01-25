export const PageLoading = () => {
    return <>
        <main className="min-h-dvh flex flex-col items-center justify-center p-4">
            <span className="pageloader"></span>
        </main>
    </>
}

export const ContentLoading = () => {
    return <>
        <main className="h-[436px] flex flex-col items-center justify-center p-4">
            <span className="contentloader"></span>
        </main>
    </>
}