import 'package:flutter/material.dart';
import '../constants/colors.dart';

enum ButtonVariant { primary, secondary, whatsapp, outline }

class PremiumButton extends StatefulWidget {
  final String text;
  final VoidCallback? onPressed;
  final ButtonVariant variant;
  final bool isLoading;
  final IconData? icon;
  final double? width;

  const PremiumButton({
    super.key,
    required this.text,
    this.onPressed,
    this.variant = ButtonVariant.primary,
    this.isLoading = false,
    this.icon,
    this.width,
  });

  @override
  State<PremiumButton> createState() => _PremiumButtonState();
}

class _PremiumButtonState extends State<PremiumButton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 100),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.95).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _handleTapDown(TapDownDetails details) {
    _controller.forward();
  }

  void _handleTapUp(TapUpDetails details) {
    _controller.reverse();
  }

  void _handleTapCancel() {
    _controller.reverse();
  }

  Color _getBackgroundColor() {
    switch (widget.variant) {
      case ButtonVariant.primary:
        return AppColors.primary;
      case ButtonVariant.secondary:
        return AppColors.secondary;
      case ButtonVariant.whatsapp:
        return AppColors.whatsapp;
      case ButtonVariant.outline:
        return Colors.transparent;
    }
  }

  Color _getTextColor() {
    switch (widget.variant) {
      case ButtonVariant.outline:
        return AppColors.primary;
      default:
        return Colors.white;
    }
  }

  BorderSide? _getBorder() {
    if (widget.variant == ButtonVariant.outline) {
      return const BorderSide(color: AppColors.primary, width: 2);
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: widget.onPressed != null && !widget.isLoading ? _handleTapDown : null,
      onTapUp: widget.onPressed != null && !widget.isLoading ? _handleTapUp : null,
      onTapCancel: _handleTapCancel,
      child: ScaleTransition(
        scale: _scaleAnimation,
        child: Container(
          width: widget.width,
          height: 56,
          decoration: BoxDecoration(
            color: _getBackgroundColor(),
            borderRadius: BorderRadius.circular(12),
            border: _getBorder() != null ? Border.all(
              color: _getBorder()!.color,
              width: _getBorder()!.width,
            ) : null,
            boxShadow: widget.variant != ButtonVariant.outline
                ? [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.1),
                      blurRadius: 8,
                      offset: const Offset(0, 4),
                    ),
                  ]
                : null,
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: widget.onPressed != null && !widget.isLoading ? widget.onPressed : null,
              borderRadius: BorderRadius.circular(12),
              child: Center(
                child: widget.isLoading
                    ? SizedBox(
                        width: 24,
                        height: 24,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          valueColor: AlwaysStoppedAnimation<Color>(_getTextColor()),
                        ),
                      )
                    : Row(
                        mainAxisSize: MainAxisSize.min,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          if (widget.icon != null) ...[
                            Icon(widget.icon, color: _getTextColor(), size: 20),
                            const SizedBox(width: 8),
                          ],
                          Text(
                            widget.text,
                            style: TextStyle(
                              color: _getTextColor(),
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
