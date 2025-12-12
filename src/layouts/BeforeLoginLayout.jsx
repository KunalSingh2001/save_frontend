function BeforeLoginLayout({ children }) {
    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default BeforeLoginLayout;
