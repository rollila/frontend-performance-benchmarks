library(reshape2)
library(ggplot2)
library(dplyr)

scen1 = list.files('~/thesis/main/csv/scenario1')
for (value in scen1) {
    csv = read.csv(sprintf("~/thesis/main/csv/scenario1/%s", value))
    withoutBlazor = filter(csv, Name != 'blazor')
    if (grepl("creation", value, fixed = TRUE) || grepl("add_one", value, fixed = TRUE)) {
        part1 = melt(withoutBlazor[0:12], id = 'Name')
        part2 = melt(withoutBlazor[,c(1, 12:21)], id = 'Name')
        part3 = melt(withoutBlazor[,c(1, 21:29)], id = 'Name')

        png(filename=sprintf("~/thesis/main/plots/scenario1/%s_1.png", value), width = 1920, height = 1080)
        plot1 = ggplot(part1, aes(x = variable, y = value, group = Name)) + geom_line(aes(color = Name)) + xlab("Number of components") + ylab("Time taken(ms)")
        print(plot1)
        dev.off()

        png(filename=sprintf("~/thesis/main/plots/scenario1/%s_2.png", value), width = 1920, height = 1080)
        plot2 = ggplot(part2, aes(x = variable, y = value, group = Name)) + geom_line(aes(color = Name)) + xlab("Number of components") + ylab("Time taken(ms)")
        print(plot2)
        dev.off()

        png(filename=sprintf("~/thesis/main/plots/scenario1/%s_3.png", value), width = 1920, height = 1080)
        plot3 = ggplot(part3, aes(x = variable, y = value, group = Name)) + geom_line(aes(color = Name)) + xlab("Number of components") + ylab("Time taken(ms)")
        print(plot3)
        dev.off()       
    }
    else {
        part1 = melt(withoutBlazor[0:12], id = 'Name')
        part2 = melt(withoutBlazor[, c(1, 13:23)], id = 'Name')

        png(filename=sprintf("~/thesis/main/plots/scenario1/%s_1.png", value), width = 1920, height = 1080)
        plot1 = ggplot(part1, aes(x = variable, y = value, group = Name)) + geom_line(aes(color = Name))
        print(plot1)
        dev.off()

        png(filename=sprintf("~/thesis/main/plots/scenario1/%s_2.png", value), width = 1920, height = 1080)
        plot2 = ggplot(part2, aes(x = variable, y = value, group = Name)) + geom_line(aes(color = Name))
        print(plot2)
        dev.off()
    }
}

scen2 = list.files('~/thesis/main/csv/scenario2/')
for (value in scen2) {
    csv = read.csv(sprintf('~/thesis/main/csv/scenario2/%s', value))
    withoutBlazor = filter(csv, Name != 'blazor')

    part1 = melt(withoutBlazor[0:12], id = 'Name')
    part2 = melt(withoutBlazor[,c(1, 12:21)], id = 'Name')
    part3 = melt(withoutBlazor[,c(1, 21:29)], id = 'Name')

    png(filename=sprintf("~/thesis/main/plots/scenario2/%s_1.png", value), width = 1920, height = 1080)
    plot1 = ggplot(part1, aes(x = variable, y = value, group = Name)) + geom_line(aes(color = Name))
    print(plot1)
    dev.off()

    png(filename=sprintf("~/thesis/main/plots/scenario2/%s_2.png", value), width = 1920, height = 1080)
    plot2 = ggplot(part2, aes(x = variable, y = value, group = Name)) + geom_line(aes(color = Name))
    print(plot2)
    dev.off()

    png(filename=sprintf("~/thesis/main/plots/scenario2/%s_3.png", value), width = 1920, height = 1080)
    plot3 = ggplot(part3, aes(x = variable, y = value, group = Name)) + geom_line(aes(color = Name))
    print(plot3)
    dev.off()     
}

scen3 = list.files('~/thesis/main/csv/scenario3')
for (value in scen3) {
    csv = read.csv(sprintf("~/thesis/main/csv/scenario3/%s", value))
    withoutBlazor = filter(csv, Name != 'blazor')

    part1 = melt(withoutBlazor[0:12], id = 'Name')
    part2 = melt(withoutBlazor[,c(1, 12:21)], id = 'Name')
    part3 = melt(withoutBlazor[,c(1, 21:24)], id = 'Name')

    png(filename=sprintf("~/thesis/main/plots/scenario3/%s_1.png", value), width = 1920, height = 1080)
    plot1 = ggplot(part1, aes(x = variable, y = value, group = Name)) + geom_line(aes(color = Name))
    print(plot1)
    dev.off()

    png(filename=sprintf("~/thesis/main/plots/scenario3/%s_2.png", value), width = 1920, height = 1080)
    plot2 = ggplot(part2, aes(x = variable, y = value, group = Name)) + geom_line(aes(color = Name))
    print(plot2)
    dev.off()

    png(filename=sprintf("~/thesis/main/plots/scenario3/%s_3.png", value), width = 1920, height = 1080)
    plot3 = ggplot(part3, aes(x = variable, y = value, group = Name)) + geom_line(aes(color = Name))
    print(plot3)
    dev.off()
}