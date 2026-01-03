import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, Play, Zap, Code2, Trophy, Rocket, ArrowRight, BookOpen, Terminal, Sparkles, ChevronRight, Clock, Award, Users, Star, Layers } from "lucide-react";

// Programming language logos as SVG components
const JSLogo = () => <svg viewBox="0 0 128 128" className="w-8 h-8">
    <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.184H1.408z" />
    <path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z" />
  </svg>;
const PythonLogo = () => <svg viewBox="0 0 128 128" className="w-8 h-8">
    <linearGradient id="python-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
      <stop offset="0" stopColor="#5A9FD4" />
      <stop offset="1" stopColor="#306998" />
    </linearGradient>
    <linearGradient id="python-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
      <stop offset="0" stopColor="#FFD43B" />
      <stop offset="1" stopColor="#FFE873" />
    </linearGradient>
    <path fill="url(#python-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" />
    <path fill="url(#python-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" />
  </svg>;
const ReactLogo = () => <svg viewBox="0 0 128 128" className="w-8 h-8">
    <g fill="#61DAFB">
      <circle cx="64" cy="64" r="11.4" />
      <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z" />
    </g>
  </svg>;
const JavaLogo = () => <svg viewBox="0 0 128 128" className="w-8 h-8">
    <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z" />
    <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z" />
    <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z" />
    <path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z" />
    <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z" />
  </svg>;
const NodeLogo = () => <svg viewBox="0 0 128 128" className="w-8 h-8">
    <path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623c-.712 0-2.306 1.061-2.306 1.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.71 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645 1.016 1.24 1.016h5.754c.354 0 .692-.286.883-.576.19-.292.293-.586.244-.928-.974-11.617-8.694-17.042-21.963-17.042-12.58 0-20.083 5.307-20.083 14.207 0 9.653 7.461 12.321 19.513 13.509 14.418 1.434 15.729 3.569 15.729 6.449 0 5.002-4.01 7.136-13.432 7.136z" />
  </svg>;
const TSLogo = () => <svg viewBox="0 0 128 128" className="w-8 h-8">
    <path fill="#007acc" d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a6.34 6.34 0 00-5.27-3c-3.39-.26-5.58 1.51-5.57 4.53a4.13 4.13 0 00.49 2.07c.67 1.33 1.93 2.13 5.86 3.72 7.24 2.93 10.33 4.85 12.48 7.74a15.57 15.57 0 011.91 10 15.24 15.24 0 01-5 9.55c-2.29 2-5.25 3.33-8.87 4-1.95.37-6.55.33-8.67-.08a20.13 20.13 0 01-10.94-6.07 24.76 24.76 0 01-2.62-4c.26-.18 1.41-.89 2.56-1.59l4.32-2.65.54-.33.74 1.08a14.65 14.65 0 004.69 3.93 11.59 11.59 0 009.42-.22 4.5 4.5 0 001.93-3.82 4.37 4.37 0 00-.52-2.29c-.82-1.48-2.43-2.51-7.23-4.62-5.5-2.42-7.87-3.92-9.81-6.22a14.68 14.68 0 01-2.25-5.13 25.56 25.56 0 01-.17-6.42c.7-4.43 3.54-8.09 7.61-9.85 1.74-.76 3.51-1.09 6.2-1.13a21.39 21.39 0 016.59.77zM50.07 68.13h11.94v39.79H50.07zm-11.94-6.73h42.35v6.73H61.64v39.79H50.07V68.13h-12z" />
  </svg>;
const CPPLogo = () => <svg viewBox="0 0 128 128" className="w-8 h-8">
    <path fill="#00599C" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z" />
    <path fill="#004482" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z" />
    <path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z" />
    <path fill="#fff" d="M82.1 61.8h5.2v-5.3h4.3v5.3H97v4.4h-5.4v5.2h-4.3v-5.2h-5.2v-4.4zm18.5 0h5.2v-5.3h4.3v5.3h5.4v4.4h-5.4v5.2h-4.3v-5.2h-5.2v-4.4z" />
  </svg>;
const SwiftLogo = () => <svg viewBox="0 0 128 128" className="w-8 h-8">
    <linearGradient id="swift-a" gradientUnits="userSpaceOnUse" x1="109.333" y1="18.515" x2="18.178" y2="109.671">
      <stop offset="0" stopColor="#FA7850" />
      <stop offset="1" stopColor="#F25130" />
    </linearGradient>
    <path fill="url(#swift-a)" d="M123.5 67.6c1.7-8.3 1.8-17.1-.1-26-.7-3.3-1.6-6.4-2.7-9.4 1.9 7.1 2.6 14.7 1.7 22.6-1.5 13.2-7 25.2-15.3 34.8 0 0-.1 0-.1.1-5.1 5.8-11.4 10.6-18.6 14.2-13.5 6.8-28.4 8.7-42.4 6.2-.3 0-.5-.1-.8-.1-.2 0-.4-.1-.5-.1-.4-.1-.7-.1-1.1-.2-2.3-.5-4.5-1.1-6.7-1.8-.8-.3-1.6-.5-2.3-.8-.9-.3-1.7-.7-2.6-1-.2-.1-.4-.1-.6-.2-.8-.3-1.6-.7-2.4-1-.3-.1-.5-.2-.8-.4-.7-.3-1.5-.6-2.2-1-.1 0-.1 0-.2-.1-.7-.3-1.3-.7-2-1-.5-.2-.9-.5-1.4-.7-.3-.2-.6-.3-.9-.5-.2-.1-.4-.2-.6-.3-.3-.2-.5-.3-.8-.5-.4-.2-.8-.5-1.1-.7l-.3-.3c-.4-.2-.7-.5-1-.7-.2-.2-.5-.3-.7-.5-.2-.1-.3-.2-.5-.3-.5-.4-1-.8-1.5-1.1-.4-.3-.8-.6-1.2-.9 37.6 27.8 91.1 9.5 99.8-33.6.1-.1.2-.2.2-.4.2-.2.4-.4.5-.6 7.9-9.2 11.8-21.7 10.1-34.4-3-18.7-15.5-34-31.7-41.3 0 0-3.6-2-3.8-2 0 0 0 0-.1 0 5.3 3.5 10.1 8 14.1 13.4-31.4-33.8-82.7-49.8-107-30.9-7.4 5.7-11.9 13.9-12.7 23-.1 1.5-.1 3 0 4.5.6 7.7 3.6 14.6 8.8 20.2C9.2 51.4 13.4 63.3 20.2 74c-2.6-4.7-4.5-9.8-5.6-15-.6-2.7-1-5.5-1.2-8.3-.1.4-.1.9-.1 1.3-.4 6.3.6 12.6 2.8 18.7C27.4 98.6 57.1 116.4 86.4 111c8.2-1.5 16-4.7 22.6-9.4-.4.6-.9 1.2-1.4 1.8-4.3 4.7-9.4 8.7-15.2 11.7-12.9 6.8-27.6 8.6-41.4 6.1 7.6 2.5 15.6 3.6 23.7 3.2 21.4-1.1 41.3-12.6 52.8-31.8 0-.1.1-.2.2-.3.3-.5.6-1.1.9-1.6l.3-.6c.2-.3.4-.7.5-1 .1-.2.2-.4.3-.5.4-.7.7-1.4 1.1-2.1 0-.1.1-.2.1-.2.7-1.5 1.4-3 2-4.5 0-.1.1-.2.1-.3.3-.7.5-1.3.8-2 .1-.2.1-.3.2-.5.6-1.5 1-3 1.5-4.6v-.1c.4-1.3.7-2.7 1-4v-.2c.2-.6.3-1.3.4-1.9v-.1c.4-1.9.6-3.8.8-5.6.2-1.7.3-3.4.3-5.1v-1.7z" />
  </svg>;
const Index = () => {
  const navigate = useNavigate();
  const technologies = [{
    name: "JavaScript",
    Logo: JSLogo
  }, {
    name: "Python",
    Logo: PythonLogo
  }, {
    name: "React",
    Logo: ReactLogo
  }, {
    name: "Java",
    Logo: JavaLogo
  }, {
    name: "Node.js",
    Logo: NodeLogo
  }, {
    name: "TypeScript",
    Logo: TSLogo
  }, {
    name: "C++",
    Logo: CPPLogo
  }, {
    name: "Swift",
    Logo: SwiftLogo
  }];
  const courses = [{
    title: "JavaScript Masterclass",
    description: "From zero to hero in modern JS",
    duration: "30 min",
    level: "Beginner",
    students: "45K+",
    gradient: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-500/30"
  }, {
    title: "Python Deep Dive",
    description: "Master Python programming",
    duration: "25 min",
    level: "Intermediate",
    students: "32K+",
    gradient: "from-blue-500/20 to-green-500/20",
    borderColor: "border-blue-500/30"
  }, {
    title: "React in 100 Seconds",
    description: "Fast-track React mastery",
    duration: "20 min",
    level: "Advanced",
    students: "28K+",
    gradient: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30"
  }];
  const stats = [{
    value: "12M+",
    label: "Learners",
    icon: Users
  }, {
    value: "50+",
    label: "Courses",
    icon: BookOpen
  }, {
    value: "95%",
    label: "Pass Rate",
    icon: Trophy
  }, {
    value: "24/7",
    label: "Access",
    icon: Clock
  }];
  return <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[300px] bg-primary/10 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative z-10 pt-4 sm:pt-8 lg:pt-12 pb-8 sm:pb-12 lg:pb-16">
        <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-5 sm:space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-3 py-1.5 animate-fade-in" style={{
              animationDelay: '0.1s'
            }}>
                <Flame className="h-3.5 w-3.5 text-primary animate-pulse" />
                <span className="text-primary font-medium text-xs sm:text-sm">Learn. Code. Conquer.</span>
              </div>

              {/* Headline */}
              <div className="space-y-3 animate-fade-in" style={{
              animationDelay: '0.2s'
            }}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight">
                  <span className="text-foreground">Build </span>
                  <span className="gradient-text">Epic</span>
                  <br />
                  <span className="text-foreground">Code Skills</span>
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg max-w-md leading-relaxed">
                  Master programming with bite-sized lessons, hands-on quizzes, and earn certificates.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 animate-fade-in" style={{
              animationDelay: '0.3s'
            }}>
                <Button onClick={() => navigate('/learn')} size="default" className="btn-fire group text-sm sm:text-base px-5 sm:px-6 py-2.5 rounded-lg">
                  <Play className="mr-1.5 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Start Learning
                  <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button onClick={() => navigate('/tests')} variant="outline" size="default" className="text-sm sm:text-base px-5 sm:px-6 py-2.5 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all">
                  <Trophy className="mr-1.5 h-4 w-4 text-primary" />
                  Get Certified
                </Button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 pt-2 animate-fade-in" style={{
              animationDelay: '0.4s'
            }}>
                {stats.map((stat, index) => <div key={index} className="flex items-center gap-2">
                    <stat.icon className="h-4 w-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>)}
              </div>
            </div>

            {/* Right Column - Code Preview */}
            <div className="relative hidden lg:block animate-fade-in" style={{
            animationDelay: '0.5s'
          }}>
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-3xl blur-3xl opacity-50"></div>
                
                {/* Code Window */}
                <div className="relative bg-card rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
                  {/* Window Header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-muted-foreground text-sm font-mono ml-4">vilver.js</span>
                  </div>
                  
                  {/* Code Content */}
                  <div className="p-6 font-mono text-sm leading-relaxed bg-background/80">
                    <div className="space-y-2">
                      <p><span className="text-purple-400">const</span> <span className="text-cyan-400">developer</span> <span className="text-foreground">=</span> <span className="text-foreground">{'{'}</span></p>
                      <p className="pl-4"><span className="text-cyan-400">skills</span><span className="text-foreground">:</span> <span className="text-green-400">"leveling up"</span><span className="text-foreground">,</span></p>
                      <p className="pl-4"><span className="text-cyan-400">mindset</span><span className="text-foreground">:</span> <span className="text-green-400">"growth"</span><span className="text-foreground">,</span></p>
                      <p className="pl-4"><span className="text-cyan-400">coffee</span><span className="text-foreground">:</span> <span className="text-orange-400">Infinity</span><span className="text-foreground">,</span></p>
                      <p className="pl-4"><span className="text-purple-400">async</span> <span className="text-yellow-400">learn</span><span className="text-foreground">()</span> <span className="text-foreground">{'{'}</span></p>
                      <p className="pl-8"><span className="text-purple-400">return</span> <span className="text-green-400">"🚀 certified!"</span></p>
                      <p className="pl-4"><span className="text-foreground">{'}'}</span></p>
                      <p><span className="text-foreground">{'}'};</span></p>
                      <p className="mt-4">
                        <span className="text-muted-foreground">// Start your journey</span>
                      </p>
                      <p>
                        <span className="text-cyan-400">developer</span><span className="text-foreground">.</span><span className="text-yellow-400">learn</span><span className="text-foreground">();</span>
                        <span className="animate-pulse text-primary ml-1">▋</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Tech Icons */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-card rounded-2xl flex items-center justify-center shadow-lg border border-border/50 animate-[float_3s_ease-in-out_infinite]">
                  <JSLogo />
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-card rounded-xl flex items-center justify-center shadow-lg border border-border/50 animate-[float_3s_ease-in-out_infinite_1s]">
                  <ReactLogo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Marquee */}
      

      {/* Featured Courses */}
      <section className="relative z-10 py-8 sm:py-12">
        <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 lg:px-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <div>
              <Badge className="bg-accent/20 text-accent border-accent/30 mb-2 text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Popular
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                Featured <span className="gradient-text">Courses</span>
              </h2>
              <p className="text-muted-foreground text-sm mt-1 max-w-md">
                Master in-demand skills with our most popular certifications
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 self-start sm:self-auto" onClick={() => navigate('/interactive-courses')}>
              View All
              <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Course Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course, index) => <div key={index} className={`group relative bg-gradient-to-br ${course.gradient} rounded-xl border ${course.borderColor} p-4 sm:p-5 hover:scale-[1.02] transition-all duration-300 cursor-pointer`} onClick={() => navigate('/tests')}>
                {/* Card Content */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-background/50 rounded-lg">
                      <Terminal className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-background/50 text-xs">
                      {course.level}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-0.5">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {course.students}
                    </span>
                  </div>

                  <Button size="sm" className="w-full bg-background/50 hover:bg-primary hover:text-primary-foreground border border-border/50 group-hover:border-primary/50 transition-all text-sm">
                    Start Quiz
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-8 sm:py-12 bg-muted/30 backdrop-blur-sm">
        <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Why <span className="gradient-text">Vilver</span>?
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              The fastest way to prove your programming skills and level up your career
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[{
            icon: Zap,
            title: "Fast Learning",
            desc: "Bite-sized lessons for busy developers",
            color: "text-yellow-500"
          }, {
            icon: Code2,
            title: "Real Code",
            desc: "Practice with actual challenges",
            color: "text-cyan-500"
          }, {
            icon: Award,
            title: "Certificates",
            desc: "Earn verified certificates",
            color: "text-purple-500"
          }, {
            icon: Rocket,
            title: "Career Boost",
            desc: "Skills employers want",
            color: "text-primary"
          }].map((feature, index) => <div key={index} className="group p-4 bg-card/50 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className={`w-10 h-10 rounded-lg bg-background flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-1">{feature.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">{feature.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-8 sm:py-12">
        <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-2xl border border-primary/30 p-6 sm:p-8 lg:p-10 text-center">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-xl mb-4 pulse-glow">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Ready to <span className="gradient-text">Level Up</span>?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto mb-6">
                Join millions of developers who've certified their skills with Vilver.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => navigate('/learn')} size="default" className="btn-fire text-sm sm:text-base px-5 sm:px-6 py-2.5 rounded-lg">
                  <Rocket className="mr-1.5 h-4 w-4" />
                  Start Free
                </Button>
                <Button onClick={() => navigate('/tests')} variant="outline" size="default" className="text-sm sm:text-base px-5 sm:px-6 py-2.5 rounded-lg border-border/50 hover:border-primary/50">
                  <Star className="mr-1.5 h-4 w-4 text-primary" />
                  Take a Quiz
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-4 border-t border-border/30">
        <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <span className="font-bold text-base">Vilver</span>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm">
              © 2025 Vilver Learning. Learn. Code. Conquer.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;