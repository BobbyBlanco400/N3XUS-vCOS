#!/bin/bash
# N3XUS v-COS Logo Display Script
# Displays the N3XUS v-COS logo in the terminal with color support

# Color definitions
CYAN='\033[96m'
PURPLE='\033[95m'
MAGENTA='\033[91m'
BLUE='\033[94m'
RESET='\033[0m'
BOLD='\033[1m'

# Function to display small logo
show_small() {
    echo -e "\n${CYAN}    ⬡  ${BOLD}N3XUS v-COS${RESET}${CYAN}  ⬡"
    echo -e "    ═══════════════════"
    echo -e "    Virtual Creative OS${RESET}\n"
}

# Function to display medium logo
show_medium() {
    cat << EOF

${CYAN} _   _ _____  ____  _ _   _ ____     __     __    ____ ___  ____  
| \ | |___ / \/ /\ \| | | | / ___|    \ \   / /   / ___/ _ \/ ___| 
|  \| | |_ \  /  \ \` | | | \___ \     \ \ / /   | |  | | | \___ \ 
| |\  |___) /  \  | | |_| |___) |     \ V /    | |__| |_| |___) |
|_| \_|____/_/\_\_|_|\___/|____/       \_/      \____\___/|____/ ${RESET}

${BLUE}        ╭─────────────────────────────────────────────────╮
        │  Virtual Creative Operating System - v1.0       │
        ╰─────────────────────────────────────────────────╯${RESET}

EOF
}

# Function to display large logo
show_large() {
    cat << "EOF"
███╗   ██╗██████╗ ██╗  ██╗██╗   ██╗███████╗    ██╗   ██╗      ██████╗ ██████╗ ███████╗
████╗  ██║╚════██╗╚██╗██╔╝██║   ██║██╔════╝    ██║   ██║     ██╔════╝██╔═══██╗██╔════╝
██╔██╗ ██║ █████╔╝ ╚███╔╝ ██║   ██║███████╗    ██║   ██║     ██║     ██║   ██║███████╗
██║╚██╗██║ ╚═══██╗ ██╔██╗ ██║   ██║╚════██║    ╚██╗ ██╔╝     ██║     ██║   ██║╚════██║
██║ ╚████║██████╔╝██╔╝ ██╗╚██████╔╝███████║     ╚████╔╝      ╚██████╗╚██████╔╝███████║
╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝      ╚═══╝        ╚═════╝ ╚═════╝ ╚══════╝
                                                                                        
           ╔══════════════════════════════════════════════════════════════╗
           ║      VIRTUAL CREATIVE OPERATING SYSTEM - THE FUTURE IS NOW   ║
           ╚══════════════════════════════════════════════════════════════╝
EOF
}

# Function to display banner
show_banner() {
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    BANNER_FILE="$SCRIPT_DIR/../logos/ascii/logo-banner.txt"
    
    if [ -f "$BANNER_FILE" ]; then
        cat "$BANNER_FILE"
    else
        show_large
    fi
}

# Main logic
SIZE="${1:-small}"

case "$SIZE" in
    small|s)
        show_small
        ;;
    medium|m)
        show_medium
        ;;
    large|l)
        show_large
        ;;
    banner|b)
        show_banner
        ;;
    *)
        echo "Usage: $0 [small|medium|large|banner]"
        echo "Default: small"
        exit 1
        ;;
esac
