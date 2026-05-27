export default function WebLoader({ children = 'រង់ចាំបន្ដិចយើងកំពុងដំណើរការ!' }) {
    return (
        <div className="web-loaded">
            <div className="webloaded-box">
                <div className="webloaded-con df-c">
                    <div class="webloadedani"></div>
                    <p>{children}</p>
                    <div class="webloadedani-right"></div>
                </div>
            </div>
        </div>
    );
}

